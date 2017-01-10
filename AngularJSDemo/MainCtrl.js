app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridConstants', '$log', 'dbService', '$timeout', function ($scope, $http, $interval, uiGridConstants, $log, dbService, $timeout) {
    var data = [];
    $scope.mySelected = [];
    $scope.gridOptions = {
        multiSelect: true,
        enableSelectAll: true,
        showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,
        columnDefs: [
            { field: 'id', width: '13%', footerCellTemplate: '<div class="ui-grid-cell-contents"><button class="btn btn-success" ng-click="printConsole()">Bulk Update</button></div>' },
            { field: 'name', width: '13%' },
            { field: 'city', width: '13%' },
            { field: 'state', width: '13%' },
            { field: 'country', width: '13%' },
            { name: 'customCellTemplate', field: 'company', width: '14%', footerCellTemplate: '<div class="ui-grid-cell-contents"><select ng-model="templateCompany"><option value="volvo">Volvo</option><option value="saab">Saab</option></select></div>' },
            { field: 'favoriteNumber', width: '13%' },
            { field: 'sex', width: '13%' },
        ],
        data: data,
    };


    // fake static data
    $scope.gridOptions.data = dbService.getStaticData();
    // From data using api call.
    // $scope.gridOptions.data = dbService.getEmployees();

    $scope.requested = false;
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;

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

    $scope.toggleColumnFooter = function () {
        console.log("Toggle...");
        $scope.gridOptions.showColumnFooter = !$scope.gridOptions.showColumnFooter;
        console.log($scope.gridApi);
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    $scope.printConsole = function () {
        console.log("Toggle...");
    };
}]);
