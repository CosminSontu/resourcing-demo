define([ 'angular', 'domReady', 'app'], 
function(angular, domReady) {
   domReady(function() {
       console.log('DOM is ready. Bootstrapping AngularJS(`ResourcingApp`)');
       angular.bootstrap(document, ['ResourcingApp']);
   });
});

