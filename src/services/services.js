define(['angular', 'wsClient'], function(angular, wsClient) {
   'use strict';
   
    var services = angular.module('services', []);
    services.factory('wsClient', function () {
        return wsClient;
    });
    
   return services;
});