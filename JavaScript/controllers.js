/**
 * Created by YeongminCha on 2014. 2. 23..
 */
var portAppControllers = angular.module('portApp.Controllers', ['portApp.Factories']);

// Base Controller
portAppControllers.controller('IndexController', ['$scope', '$location', 'IndexFactory', function ($scope, $location, IndexFactory) {

    $scope.initializeIndex = function () {
        $scope.indexObject.flagOfTopPanel = true;
        $scope.indexObject.flagOfNavigator = true;
        $scope.indexObject.indexContext = IndexFactory.context;
    };

    $scope.toggleTopPanel = function () {
        $scope.indexObject.flagOfTopPanel = !$scope.indexObject.flagOfTopPanel;
    }

    $scope.toggleNavigator = function () {
        $scope.indexObject.flagOfNavigator = !$scope.indexObject.flagOfNavigator;
    }

    $scope.joinNew = function () {
        $scope.indexObject.indexContext.flagOfNew = true;
    }

    $scope.indexObject = {};
    $scope.initializeIndex();
}]);

portAppControllers.controller('MainController', ['$scope', function ($scope) {
    $scope.initializeIndex();
    $scope.indexObject.flagOfTopPanel = false;
    $scope.indexObject.flagOfNavigator = false;
}]);

portAppControllers.controller('WheelhouseController', ['$scope', '$modal', '$timeout', function ($scope, $modal, $timeout ) {
    $scope.openDialogue = function () {
        $modal.open({
            templateUrl: 'HTML/partial/dialogues.html',
            controller: DialogueController,
            resolve: {
            }
        });
    }

    $scope.checkNewMember = function () {
        if ($scope.indexObject.indexContext.flagOfNew) {
            $scope.indexObject.indexContext.flagOfNew = false;
            $scope.openDialogue();
        }
    }

    $scope.startPeriodicallyChange = function(){
        $timeout( function(){
            $scope.indexObject.indexContext.quantityOfVitality -= 1;
            if( $scope.indexObject.indexContext.quantityOfDay < 0 ) $scope.indexObject.indexContext.quantityOfDay = 100;
            $scope.startPeriodicallyChange();
        }, 4000 );
    }

    $scope.initializeIndex();
    $scope.indexObject.flagOfTopPanel = true;
    $scope.checkNewMember();
    $scope.startPeriodicallyChange();
}]);

var DialogueController = function ($scope, $modalInstance) {
    $scope.close = function () {
        $modalInstance.dismiss('close');
    }
}

portAppControllers.controller('WorkshopController', ['$scope', function ($scope) {
    $scope.initializeIndex();
    $scope.indexObject.flagOfTopPanel = true;
}]);

portAppControllers.controller('BedroomController', ['$scope', function ($scope) {
    $scope.increaseVitality = function (vitality) {
        $scope.indexObject.indexContext.quantityOfVitality += vitality;
    }

    $scope.initializeIndex();
    $scope.indexObject.flagOfTopPanel = true;
}]);

portAppControllers.controller('SternController', ['$scope', function ($scope) {
    $scope.initializeIndex();
    $scope.indexObject.flagOfTopPanel = true;
}]);

portAppControllers.controller('StemController', ['$scope', function ($scope) {
    $scope.initializeIndex();
    $scope.indexObject.flagOfTopPanel = true;
}]);

portAppControllers.controller('EngineRoomController', ['$scope', function ($scope) {
    $scope.initializeIndex();
    $scope.indexObject.flagOfTopPanel = true;
}]);

