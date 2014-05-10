define([], function(controllers)
{

    return function($scope, wsClient) {

        $scope.checkpointsArray = [];
        $scope.currentCheckpoint = 0;
        $scope.opportunities = [];
        $scope.percentComplete = 0;

        $scope.getCurrentCheckpoint = function()
        {
            //console.log('getCurrentCheckpoint()');
            return $scope.forecast._embedded.checkpoints[$scope.currentCheckpoint];
        };

        $scope.computePercent = function() {
            //console.log('computePercent()');
            if (!$scope.forecast)
                return;
            var checkpoint = $scope.getCurrentCheckpoint();
            if (!checkpoint)
                return;

            var overallPercent = 0;

            for (var j = 0; j < checkpoint._embedded.skills.length; j++) {
                var skill = checkpoint._embedded.skills[j];
                overallPercent += skill.percent;
            }

            $scope.percentComplete = overallPercent / checkpoint._embedded.skills.length;
        };

        $scope.resetSlider = function() {
            //console.log('resetSlider()');
            $scope.checkpointMaxIndex = $scope.checkpointsArray.length - 1;
            $scope.currentCheckpoint = 0;
            $scope.computePercent();
        };

        $scope.getOpportunityId = function(o) {
            var uid = o._links.self.href;
            var idIndex = uid.lastIndexOf('/') + 1;
            return uid.substr(idIndex);
        };

        $scope.opportunityChanged = function(o) {
            //console.log('opportunityChanged');
            var idIndex = $scope.getOpportunityId(o);
            $scope.resetSlider();
            $scope.updateForecast(idIndex);

        };

        $scope.updateForecast = function(opportunityId) {
            //console.log('updateForecast');
            wsClient.getForecast(opportunityId, function(forecast) {
                $scope.forecast = forecast;
                $scope.computePercent();
                $scope.checkpointsArray = [];
                for (var i = 0; i < $scope.forecast._embedded.checkpoints.length; i++) {
                    var checkpoint = $scope.forecast._embedded.checkpoints[i];
                    var checkpointColor = 'green';
                    for (var j = 0; j < checkpoint._embedded.skills.length; j++) {
                        var skill = $scope.forecast._embedded.checkpoints[i]._embedded.skills[j];
                        skill.percent = skill.actual * 100 / skill.expected;

                        if (skill.percent >= 100) {
                            skill.percent = 100;
                            skill.color = 'green';
                        } else {
                            checkpointColor = skill.color = 'red';
                        }
                    }
                    checkpoint.color = checkpointColor;
                    $scope.checkpointsArray.push(checkpoint.date);
                }

                $scope.resetSlider();
                $scope.forecastSkills = $scope.getCurrentCheckpoint()._embedded.skills;
            });
        };

        wsClient.getOpportunities(function(opportunities) {
            //console.log('getOpportunities');
            $scope.opportunities = opportunities._embedded.items;
            if (opportunities._embedded.items.length > 0) {
                $scope.selectedOpportunity = $scope.opportunities[0];
            }

            $scope.resetSlider();
            $scope.updateForecast($scope.getOpportunityId($scope.selectedOpportunity)); //TODO: first opportunity id here
        });

        $scope.checkpointTranslate = function(value) {
            //console.log('checkpointTranslate');
            $scope.currentCheckpoint = value;
            if (!$scope.forecast) {
                return;
            }

            var currentCheckpointObject = $scope.getCurrentCheckpoint();
            if (!currentCheckpointObject) {
                return;
            }

            $scope.forecastSkills = currentCheckpointObject._embedded.skills;
            $scope.computePercent();
            var firstDateSeparatorIndex = $scope.checkpointsArray[value].indexOf('T');
            return $scope.checkpointsArray[value].substr(0, firstDateSeparatorIndex);
        };

    };
}
);


