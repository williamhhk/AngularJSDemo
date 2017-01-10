app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridConstants', '$log', 'dbService', '$timeout', function ($scope, $http, $interval, uiGridConstants, $log, dbService, $timeout) {
    $scope.mySelectedRows = [];
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
    };

    $scope.gridOptions.data = fakeData;
    //$scope.gridOptions.data = dbService.getEmployees();

    $scope.requested = false;
    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = true;
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            //var msg = 'row selected ' + row.isSelected;
            $log.log("Row data = ");
            $log.log(row.entity);
            //$log.log(row.entity.InstallType);
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
