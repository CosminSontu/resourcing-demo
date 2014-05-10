'use stict';

require.config({
  baseUrl: '/',
  paths: {
    app: 'src/app',
    // config
    config: 'src/config',
    // controllers
    controllers: 'src/controllers/controllers',
    indexCtrl: 'src/controllers/index-ctrl',
    taxonomyCtrl: 'src/controllers/taxonomy-ctrl',
    forecastCtrl: 'src/controllers/forecast-ctrl',
    // filters
    filters: 'src/filters/filters',
    // directives
    directives: 'src/directives/directives',
    rzSliderDtv: 'src/directives/rz-slider-dtv',
    // services
    services: 'src/services/services',
    wsClient: 'src/services/wsClient',
    // libs
    domReady: 'lib/require/domReady',
    jQuery: 'lib/jquery/jquery',
    angular: 'lib/angular/angular',
    resource: 'lib/angular/angular-resource',
    route: 'lib/angular/angular-route',
    bootstrap: 'lib/bootstrap/bootstrap',
    d3: 'lib/d3/d3'
 },
 shim: {
   
   angular: { deps: [ 'jQuery' ],
              exports: 'angular'},
   resource: { deps: ['angular'],
               exports: 'resource' },
   route: { deps: ['angular'],
            exports: 'route' },
   d3 : { exports: 'd3' }
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
       var applicationModule = 'ResourcingApp';
       console.log('DOM is ready. Bootstrapping AngularJS(`'+applicationModule+'`)');
       angular.bootstrap(document, [ applicationModule ]);
   });
}); 