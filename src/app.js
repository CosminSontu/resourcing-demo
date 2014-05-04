<<<<<<< HEAD
define(['angular', 'resource', 'route', 'controllers',
=======
define(['angular', 'resource', 'controllers',
>>>>>>> 34527c827cdac314ec3ccfd175218a44d247bf4d
        'services', 'filters',
        'directives'], 
        function (angular) {
            console.log('app.js');
            return angular.module('ResourcingApp', 
                                  [ 'ngRoute', 'ngResource', 
                                   'controllers', 'services', 'filters', 'directives']); 
                                   // only angular modules should be specified
});


