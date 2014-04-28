'use stict';

require.config({
  baseUrl: '/',
  paths: {
    app: 'src/app',
    controllers: 'src/controllers/controllers',
    filters: 'src/filters/filters',
    directives: 'src/directives/directives',
    services: 'src/services/services',
    ngBootstrap: 'src/ngBootstrap',
    angular: 'lib/angular/angular',
    jQuery: 'lib/jquery/jquery',
    domReady: 'lib/require/domReady',
    resource: 'lib/angular/angular-resource',
    bootstrap: 'lib/bootstrap/bootstrap',
    wsClient: 'src/services/wsClient',
    config: 'src/config'
 },
 shim: {
   
   bootstrap: ['jQuery'],
               
   angular: { deps: [ 'jQuery' , 'bootstrap' ],
              exports: 'angular'},
    
   resource: { deps: ['angular'],
               exports: '$resource' }
  
 }
});

require([ 'angular', 'app', 'config', 'services', 'ngBootstrap'
        // Any individual controller, service, directive or filter file
        // that you add will need to be pulled in here.
        // This will have to be maintained by hand.
    ],
    function (angular, app, config) {
      'use strict';
      app.config(['$routeProvider',
        function($routeProvider) {
          // Define your Routes here
        }
      ]);
    }
);


