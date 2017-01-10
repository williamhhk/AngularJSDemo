app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridConstants', '$log', 'dbService', '$timeout', function ($scope, $http, $interval, uiGridConstants, $log, dbService, $timeout) {
    $scope.mySelectedRows = [];
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect : false,
        modifierKeysToMultiSelect : false,
        noUnselect : true,
        //data : fakeData,
    };

    // fake static data
    $scope.gridOptions.data = dbService.getStaticData();
    // From data using api call.
    // $scope.gridOptions.data = dbService.getEmployees();

    $scope.requested = false;
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            $log.log(row.entity);
            $scope.metaData = {
                id: row.entity.id,
                name: row.entity.name,
                city: row.entity.city,
                state: row.entity.state,
                country: row.entity.country,
                company: row.entity.company,
                favoriteNumber: row.entity.favoriteNumber,
                sex: row.entity.sex
            }
        });
    };

    $scope.saveEmployeeData = function () {
        $scope.gridOptions.data.push($scope.metaData);
        $log.log($scope.metaData);
        //dbService.saveEmployeeData($scope.metaData);
    }
}]);
