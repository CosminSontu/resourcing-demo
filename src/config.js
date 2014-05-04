define([], 
        function () {
            console.log('config.js');
            return {
              routes : [{ path: '/', templateDescriptor : { templateUrl : '/partials/index.html' }},
                        { path: '/taxonomy', templateDescriptor : { templateUrl : '/partials/taxonomy.html' }}
                       ]
            };
        });


