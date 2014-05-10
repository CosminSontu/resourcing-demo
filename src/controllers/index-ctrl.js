define([], function()
{
    return function($scope) {
        $scope.totalItems = 3;
        $scope.items = [];
        $scope.setIndex = function(index) {
            for (var i = 0; i < $scope.totalItems; i++) {
                $scope.items[i] = (i === index) ? 'nav active' : 'nav';
            }
        };
    };
});


