'use stict';

require.config({
  baseUrl: '/',
  paths: {
    app: 'src/app',
    controllers: 'src/controllers/controllers',
    filters: 'src/filters/filters',
    directives: 'src/directives/directives',
    services: 'src/services/services',
<<<<<<< HEAD
=======
    ngBootstrap: 'src/ngBootstrap',
>>>>>>> 34527c827cdac314ec3ccfd175218a44d247bf4d
    angular: 'lib/angular/angular',
    jQuery: 'lib/jquery/jquery',
    domReady: 'lib/require/domReady',
    resource: 'lib/angular/angular-resource',
<<<<<<< HEAD
    route: 'lib/angular/angular-route',
=======
>>>>>>> 34527c827cdac314ec3ccfd175218a44d247bf4d
    bootstrap: 'lib/bootstrap/bootstrap',
    wsClient: 'src/services/wsClient',
    config: 'src/config'
 },
 shim: {
   
<<<<<<< HEAD
   
=======
   bootstrap: ['jQuery'],
>>>>>>> 34527c827cdac314ec3ccfd175218a44d247bf4d
               
   angular: { deps: [ 'jQuery' ],
              exports: 'angular'},
   bootstrap: ['jQuery', 'angular'],
   resource: { deps: ['angular'],
               exports: 'resource' },
   route: { deps: ['angular'],
            exports: 'route' }
           
  
 }
});

<<<<<<< HEAD
require([ 'app', 'config', 'domReady'
=======
require([ 'angular', 'app', 'config', 'services', 'ngBootstrap'
>>>>>>> 34527c827cdac314ec3ccfd175218a44d247bf4d
        // Any individual controller, service, directive or filter file
        // that you add will need to be pulled in here.
        // This will have to be maintained by hand.
    ],
<<<<<<< HEAD
    function(app, config, domReady) {
    'use strict';
    
    console.log('entered main.js::require()');
    app.config( [ '$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(false);                               
            //$routeProvider.when('/taxonomy', { templateUrl: '/partials/taxonomy.html' })
                                               
                                               
                                        var rProv = $routeProvider;
                                        
                                        for (var i=0; i < config.routes.length; i++) {
                                            var route = config.routes[i];
                                            rProv = rProv.when(route.path, route.templateDescriptor);
                                            console.log('Registered route ('+route.path+') with template (' + route.templateDescriptor.templateUrl + ')');
                                           }
                                        rProv.otherwise({ redirectTo: '/'});
                                    }] );
    
   domReady(function() {
       console.log('DOM is ready. Bootstrapping AngularJS(`ResourcingApp`)');
       angular.bootstrap(document, ['ResourcingApp']);
   });
}); 
=======
    function (angular, app, config) {
      'use strict';
      app.config(['$routeProvider',
        function($routeProvider) {
          // Define your Routes here
        }
      ]);
    }
);


>>>>>>> 34527c827cdac314ec3ccfd175218a44d247bf4d
