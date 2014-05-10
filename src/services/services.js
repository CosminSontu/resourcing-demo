define(['angular', 'wsClient'], function(angular, wsClient) {
   'use strict';
   
    return angular.module('services', [])
           .factory('wsClient', ['$resource', '$q', wsClient]);
    
   return services;
});