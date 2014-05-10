define(['angular', 'resource', 'route', 'controllers',
        'services', 'filters', 'directives'], 
        function (angular) {
            console.log('app.js');
            return angular.module('ResourcingApp', 
                                  [ 'ngRoute', 'ngResource', 
                                   'controllers', 'services', 'filters', 'directives']); 
                                   // only angular modules should be specified
});


