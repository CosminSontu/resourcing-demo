define(['angular', 'resource', 'controllers/controllers',
        'services/services', 'filters/filters',
        'directives/directives'], 
        function (angular) {
            return angular.module('ResourcingApp', 
                                  ['ngResource', 'controllers', 'services',
                                   'filters', 'directives']);
});


