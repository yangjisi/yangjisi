/**
 * Created by YeongminCha on 2014. 2. 23..
 */
var portAppFactories = angular.module( 'portApp.Factories', [] );

portAppFactories.factory( 'IndexFactory', [function(){
    // init default values;
    this.init = function(){
        var quantityOfMoney = 50;
        var quantityOfDay = 1;
        var quantityOfVitality = 100;
        var quantityOfElectricity = 100;
        var quantityOfWeight = "MAX";
        var flagOfNew = false;
        this.context = { quantityOfMoney: quantityOfMoney,
            quantityOfDay: quantityOfDay,
            quantityOfVitality: quantityOfVitality,
            quantityOfElectricity: quantityOfElectricity,
            quantityOfWeight: quantityOfWeight,
            flagOfNew: flagOfNew
        };
    }

    this.init();

    return this;
}] );

