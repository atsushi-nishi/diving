divingApp.controller('logCtrl', [
  '$scope',
  '$http',
  '$window',
//  'toggle-switch',
  function($scope, $http) {
    console.log('logCtrl');


    $scope.newLog = {};
    $scope.lastLog = {};


    $scope.initNewLog = function() {

      $scope.newLog = {
        logNumber: 1,
        diverId: 2,
        diveDate: new Date(2016, 0, 1),
        diveLocationId: 99,
        waterEntryKind: "Boat",
      };
    };

    $scope.getLastLog = function() {

      $http.get('/api/logs/search?sort=-createdAt')
        .success(function(data) {
          console.log("[info]getLastLog success", data);
          $scope.lastLog = data;
          if ($scope.lastLog) {
            $scope.newLog.logNumber = $scope.lastLog.logNumber + 1;
          } else {
            $scope.newLog.logNumber = 1;
          }
        })
        .error(function(data) {
          console.error("[error]getLastLog failed ", data);
        });
    }

    $scope.saveLog = function() {

      console.log("[func]saveLog");

      var data = $scope.newLog;
      console.log("[info]data", data);

      $http.post('/api/logs', data)
        .success(function(data) {
          console.log("[info]saveLog success");
          console.dir(data);
          $window.location.href = "/logs";
        })
        .error(function(data) {
          console.error("[error]saveLog failed ", data);
        });
    };

    $scope.initNewLog();
    $scope.getLastLog();

}]);
