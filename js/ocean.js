
$(document).ready(function(){
    ocean();

});

var WIDTH = 1800;
var HEIGHT = 768;
var HALF_WIDTH = WIDTH*0.5;
var HALF_HEIGHT = HEIGHT*0.49;

function ocean(){
    var fov = 1230;
    var RS  = 166;
    var screenLeft = 0.0;
    var screenFront = 0.0;
    var screenTop  = 2.0;
    var reflectW = 0.08;
    var canvas = document.getElementById('wave');
    var c = canvas.getContext('2d');

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    function convert3Dto2D(x3d,y3d,z3d){
        var scale = fov/(fov-z3d);
        var x2d = ((x3d-HALF_WIDTH) * scale) + HALF_WIDTH*.18;
        var y2d = ((y3d-HALF_HEIGHT) * scale*0.1) + HALF_HEIGHT + (z3d*0.0001);

        return [x2d, y2d];
    }
    function wave(x, y){
        return	(Math.sin(x*.06) + Math.sin(((x*0.9)-(y*.39))*2.3)) * reflectW;
    }

    function drawLand() {

        c.clearRect(0,0, WIDTH, HEIGHT);
        screenFront += 1;
        screenLeft -= 0.01;

        var slicecount = WIDTH / RS  ;
        var leftshift = (screenLeft%0.01) * RS;
        var frontshift = (screenFront%1) * RS;
        var p2d = [0,0];

        for(var slicez=32; slicez>=5; slicez--){

            c.beginPath();
            var edgewidth = slicez * reflectW * 3;
            var zpos  = (slicez*RS*1.3) - frontshift;
            var slicevisible = false;

            if(Math.abs(zpos)>(19*RS) - frontshift){
                scol = "rgba(93,35,30,0.9)";
                c.fillStyle = "rgba(255,251,213,.3)";

            }else{
                scol = "rgba(253,253,225,0.9)";
                c.fillStyle ="rgba(255,214,163,.6)";
                c.shadowOffsetX = 15;
                c.shadowOffsetY = 2;
                c.shadowBlur = 10;
                c.shadowColor = "rgba(255,213,162,.8)";

            }

            var firstpoint = true;

            for(var slicex = -edgewidth; slicex<=slicecount+edgewidth; slicex++){

                var osc = (wave(slicex+screenLeft, screenFront+slicez));
                var xpos  = (slicex*RS/2) - leftshift;
                var ypos  = (osc-screenTop) *RS;

                p2d = convert3Dto2D( xpos,ypos,zpos );

                if( p2d[1] > HEIGHT ) 	p2d[1]=HEIGHT;
                else if( p2d[1] < 0 )   p2d[1]=0;

                else slicevisible = true;

                if(firstpoint){

                    c.moveTo( p2d[0], p2d[1] );
                    firstpoint = false;

                }else{ c.lineTo(p2d[0],p2d[1]);
                }
            }
            if(		slicevisible	)
                c.fill();
        }
    }

    setInterval(drawLand, 90);
}



