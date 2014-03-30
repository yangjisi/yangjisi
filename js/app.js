var app = angular.module("app",[]).config(function($routeProvider){

  $routeProvider.when('/login', {
      
      templateUrl : 'partials/login.html',
      controller : 'LoginController'
  
  });

});


app.controller('LoginController',function(){

})
