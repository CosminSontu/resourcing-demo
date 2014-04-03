'use stict';

require.config({
  baseUrl: '/resourcing-demo',
  paths: {
    app: 'src/app',
    controllers: 'src/controllers',
    filters: 'src/filters',
    directives: 'src/directives',
    services: 'src/services',
    ngBootstrap: 'src/ngBootstrap',
    angular: 'lib/angular/angular',
    jQuery: 'lib/jquery/jquery',
    domReady: 'lib/require/domReady',
    resource: 'lib/angular/angular-resource',
    bootstrap: 'lib/bootstrap/bootstrap'
 },
 shim: {
   
   
   bootstrap: ['jQuery'],
               
   angular: { deps: [ 'jQuery' , 'bootstrap' ],
              exports: 'angular'},
    
   resource: { deps: ['angular'],
               exports: '$resource' }
  
 }
});

require([ 'angular', 'app', 'ngBootstrap'
        // Any individual controller, service, directive or filter file
        // that you add will need to be pulled in here.
        // This will have to be maintained by hand.
    ],
    function (angular, app) {
      'use strict';
      app.config(['$routeProvider',
        function($routeProvider) {
          // Define your Routes here
        }
      ]);
    }
);


