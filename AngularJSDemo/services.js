//// Angular Factories , provide service to access database.
app.factory('dbService', function ($http, $q, $rootScope) {
    return {
        saveEmployeeData: function (metaData) {
            console.log(metaData);
            var deferred = $q.defer();
            $http.post('/Home/SaveEmployee', { 'metaData': metaData }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        },
        getEmployees: function () {
            var deferred = $q.defer();
            $http.get('/Home/GetEmployees').success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        },
    };
});