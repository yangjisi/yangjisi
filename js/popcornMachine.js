SystemInformation = (function(){

    var siFps = document.getElementById("fps");
    var siPopcorns = document.getElementById("siPopcornsCount");
    var lastFps = 0;

    function getInfo(){
        var info = {};
        info.width = window.innerWidth;
        info.height = window.innerHeight;
        return info;
    }

    var onFps;

    function post(inf){
        if(!inf) return;
        if(inf.fps){
            lastFps = inf.fps;
            if(onFps && typeof (onFps) === "function")
            {  onFps(inf.fps); }
            // siFps.textContent = inf.fps;
        }
        if(inf.popcorns){
            if(Popcorns.popcornsDynamic)
            {  siPopcorns.textContent = inf.popcorns; }
        }
    }
    function setOnFps(handler){ onFps = handler; }
    function getLastFps(){ return lastFps; }

    return {
        "post" : post,
        "getInfo" : getInfo,
        "setOnFps" : setOnFps,
        "getLastFps" : getLastFps
    }
})();

Animation = (function () {
    "use strict";
    var frameRenderersCollection = [];
    var renderContextesCollection = [];

    var isRunning = false;
    var animationCallback;

    var minInterval = 16.7;
    var avgTime = 0;
    var trackFrames = 60;
    var frameCounter = 0;

    function addFrameRenderer(frameRender, renderContext) {

        if (frameRender && typeof (frameRender) === "function") {
            frameRenderersCollection.push(frameRender);
            renderContextesCollection.push(renderContext); }
    }

    function getRequestAnimationFrame(code) {

        if (window.requestAnimationFrame) {
            return window.requestAnimationFrame(code);
        } else if (window.msRequestAnimationFrame) {
            return window.msRequestAnimationFrame(code);
        } else if (window.webkitRequestAnimationFrame) {
            return window.webkitRequestAnimationFrame(code);
        } else if (window.mozRequestAnimationFrame) {
            return window.mozRequestAnimationFrame(code);
        } else { return setTimeout(code, minInterval); }
    }

    function frameRenderCore() {
        var startDate = new Date();

        for (var ii=0; ii<frameRenderersCollection.length; ii++) {
            if (frameRenderersCollection[ii]) {
                frameRenderersCollection[ii](renderContextesCollection[ii]);}
        }

        if (isRunning) {
            animationCallback = getRequestAnimationFrame(frameRenderCore); }

        var endDate = new Date();
        var duration = (endDate - startDate);

        avgTime += duration;

        frameCounter++;

        if (frameCounter >= trackFrames) {
            avgTime = avgTime / trackFrames;
            var avgFps = Math.floor(1000 / avgTime);
            if (avgFps > 60) avgFps = 60;

            SystemInformation.post({  fps: avgFps,
                popcorns: (Popcorns.popcornsDynamic) ? Popcorns.count() : ""
            });

            avgTime = 0;
            frameCounter = 0;
        }
    }

    function start() {
        if (isRunning) return;
        animationCallback = getRequestAnimationFrame(frameRenderCore);
        isRunning = true;
    }

    function stop() {
        if (!isRunning) return;
        clearInterval(animationCallback);
        isRunning = false;
    }

    function toggle() {
        var playbackControl = (isRunning) ? stop : start;
        playbackControl();
    }

    return {    "addFrameRenderer": addFrameRenderer,
        "start": start,
        "stop": stop,
        "toggle": toggle,
        "getRequestAnimationFrame": getRequestAnimationFrame    }

})();


Popcorns = (function(){ var popcorns = [];
    var popcornsDefaultNumber = 500;
    var popcornsDynamic = false;

    var corn = [];
    var cornSplit = 10,
        splitW = 169,
        splitH = 121;

    var space = { width  : 1800,
        height : 960	};

    var minVV = 3;
    var maxVV = 50;
    var minHV = 1;
    var maxHV = 10;
    var minD = 15;
    var maxD = 30;
    var minS = 0.6;
    var maxS = 1.0;

    function generate(number,add){

        var img = new Image();
        img.onload = function(){  for(var i=0; i<cornSplit; i++){
            var split = document.createElement("canvas");
            var context = split.getContext("2d");
            split.width = splitW;
            split.height = splitH;
            context.drawImage(img, splitW*i, 0,
                splitW, splitH,
                0, 0, splitW, splitH);
            corn.push(split); }

            if(number){	popcornsDefaultNumber = number;	}
            if(!add){	popcorns = [];	}
            for(var i=0; i<popcornsDefaultNumber; i++){
                popcorns.push(   makePopcorn()	);	}
        }
        img.src =  "img/popcorn.png";
    }

    function makePopcorn(){

        var scale = Math.random()*(maxS-minS)+minS;
        return {
            x  : space.width-300,
            y  : space.height-130,
            vv : Math.random()*(maxVV-minVV)+minVV ,
            hv : Math.random()*(maxHV-minHV)+minHV ,
            w  : scale * splitW,
            h  : scale * splitH,
            d  : Math.random()*(maxD-minD)+(minD),
            hd : 0,
            hi : Math.random()*(maxHV-minD),
            s  : Math.ceil(Math.random()*(cornSplit-1)),
            nl : false
        }
    }

    function blowPopcorn(){

        for(var i=0; i<popcorns.length; i++){

            var pop = popcorns[i];

            pop.hd += pop.hi;

            pop.x += (pop.hv + pop.hd)*3 ;
            pop.y -= (pop.vv + pop.hd)  ;

            if(pop.hd < pop.d){
                pop.hd -= pop.hi;
                pop.vv -= 0.9;
                pop.hv -= 0.1;  }

            if( pop.y > space.height+20 && pop.x > space.width*0.48 && pop.x < space.width*.9 ){
                pop.vv = 6;
                pop.hd -= 0.01;
                pop.hv = 4;  }

        } }

    function renderFrame(ctx){

        blowPopcorn();

        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

        for(var i=0; i<popcorns.length; i+=2){

            var pop = popcorns[i];

            ctx.save();
            ctx.translate(300,-430);
            ctx.drawImage(corn[pop.s],
                0, 0, splitW, splitH,
                pop.x/2, pop.y, pop.w*.7, pop.h*.7);
            ctx.restore(); }
    }


    function count(){ return popcorns.length; }

    function add(number) {
        if(!number){number = popcorns.length;}
        generate(number,true);
    }

    function remove(number){
        if(!number){number = popcorns.length ;}
        if(popcorns.length - number > 0){
            popcorns = popcorns.slice(0, popcorns.length - number);
        }
        popcorns=0
    }


    return {
        "generate" : generate,
        "add" : add,
        "remove" : remove,
        "count" : count,
        "render" : renderFrame,
        "popcornsDynamic" : popcornsDynamic
    }
})();

window.fly = {
    spritely: {
        init: function() {
            $('#popmachine_lid')
                .sprite({fps:12, no_of_frames: 5});
            setTimeout( function(){ $('#day').fadeOut(5000,function(){
                $('#light').fadeIn(500); });}, 3000);
        }
    }
};


(function(){

    var popcornCanvas = document.getElementById("popcornCanvas");
    var popcornContext = popcornCanvas.getContext("2d");
    var siPopcornsCount = document.getElementById("siPopcornsCount");

    function resizeCanvas(){   popcornCanvas.width = 1800;
        popcornCanvas.height =  960;   }

    window.onload = function(){ init();
                                window.fly.spritely.init();
                                setTimeout(function(){Popcorns.generate();
                                    Animation.addFrameRenderer(Popcorns.render, popcornContext);
                                    Animation.start();
                                },2000);

    }

    function init(){
        var pressureSelect = document.getElementById("machineControl");
        resizeCanvas();

        $("#popcornCanvas").click(function(){

            Popcorns.generate();
            Animation.addFrameRenderer(Popcorns.render, popcornContext);
            Animation.start();

        })
    }


})();
