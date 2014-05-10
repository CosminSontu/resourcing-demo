define([], 
        function () {
                //console.log('config.js');
                var baseUrl = 'http://192.168.196.13:8080';
                return {
                  stubbed : true, // change this to false if baseUrl points to a compatible server
                  routes : [{ path: '/', templateDescriptor : { templateUrl : '/partials/taxonomy.html' }},
                            { path: '/taxonomy', templateDescriptor : { templateUrl : '/partials/taxonomy.html' }},
                            { path: '/taxonomy/distribution', templateDescriptor : { templateUrl : '/partials/taxonomy.html' }},
                            { path: '/taxonomy/deficit', templateDescriptor : { templateUrl : '/partials/taxonomy.html' }},
                            { path: '/opportunity/forecast', templateDescriptor : { templateUrl : '/partials/forecast.html' }}
                           ],
                  taxonomyUrl : function () { 
                                return baseUrl + '/modularity/forecast/distribution';
                             },
                  opportunitiesUrl : function () { 
                                return baseUrl + '/modularity/opportunities';
                             },
                  forecastUrl : function () { 
                                return baseUrl + '/modularity/forecast/checkpoints';
                             }
                };
            }
        );


