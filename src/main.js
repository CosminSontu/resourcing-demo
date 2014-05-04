'use stict';

require.config({
  baseUrl: '/',
  paths: {
    app: 'src/app',
    controllers: 'src/controllers/controllers',
    filters: 'src/filters/filters',
    directives: 'src/directives/directives',
    services: 'src/services/services',
    angular: 'lib/angular/angular',
    jQuery: 'lib/jquery/jquery',
    domReady: 'lib/require/domReady',
    resource: 'lib/angular/angular-resource',
    route: 'lib/angular/angular-route',
    bootstrap: 'lib/bootstrap/bootstrap',
    wsClient: 'src/services/wsClient',
    config: 'src/config'
 },
 shim: {
   
   
               
   angular: { deps: [ 'jQuery' ],
              exports: 'angular'},
   bootstrap: ['jQuery', 'angular'],
   resource: { deps: ['angular'],
               exports: 'resource' },
   route: { deps: ['angular'],
            exports: 'route' }
           
  
 }
});

require([ 'app', 'config', 'domReady'
        // Any individual controller, service, directive or filter file
        // that you add will need to be pulled in here.
        // This will have to be maintained by hand.
    ],
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