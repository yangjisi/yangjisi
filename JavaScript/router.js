/**
 * Created by YeongminCha on 2014. 2. 23..
 */

var portApp = angular.module( 'portApp.route', ['ngRoute'] );

portApp.config( ['$routeProvider', function( $routeProvider ){

    $routeProvider.
        when( '/main', {
            controller: 'MainController',
            templateUrl: 'HTML/main.html'
        } ).
        when( '/wheelhouse', {
            controller: 'WheelhouseController',
            templateUrl: 'HTML/wheelhouse.html'
        } ).
        when( '/workshop', {
            controller: 'WorkshopController',
            templateUrl: 'HTML/workshop.html'
        } ).
        when( '/bedroom', {
            controller: 'BedroomController',
            templateUrl: 'HTML/bedroom.html'
        } ).
        when( '/stern', {
            controller: 'SternController',
            templateUrl: 'HTML/stern.html'
        } ).
        when( '/stem', {
            controller: 'StemController',
            templateUrl: 'HTML/stem.html'
        } ).
        when( '/engineRoom', {
            controller: 'EngineRoomController',
            templateUrl: 'HTML/engineRoom.html'
        } ).
        otherwise( {
            redirectTo: 'main'
        } );
}] );
