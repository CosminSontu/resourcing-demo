define(['angular', 'indexCtrl', 'taxonomyCtrl', 'forecastCtrl'], function(angular, indexCtrl, taxonomyCtrl, forecastCtrl) {
    'use strict';
    return angular.module('controllers', [])
            .controller('IndexCtrl', indexCtrl)
            .controller('TaxonomyCtrl', taxonomyCtrl)
            .controller('ForecastCtrl', forecastCtrl);

});


