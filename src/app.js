define(['angular', 'resource', 'controllers',
        'services', 'filters',
        'directives'], 
        function (angular) {
            return angular.module('ResourcingApp', 
                                  ['ngResource', 'controllers', 'services',
                                   'filters', 'directives']);
});


