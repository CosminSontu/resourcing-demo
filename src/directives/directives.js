define(['angular', 'rzSliderDtv'], function(angular, rzSliderDtv) {
   'use strict';
   return angular.module('directives', [])
           .value("throttle", rzSliderDtv.valueThrottle)
           .factory("Slider", rzSliderDtv.factorySlider)
           .directive("rzslider", rzSliderDtv.directiveRzSlider);
});