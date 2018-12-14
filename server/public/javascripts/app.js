var app = angular.module('angularjsNodejsTutorial',[]);
//var request=require('request');

app.controller('myController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/restaurants/bestR/'+$scope.state);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });

        var request2 = $http.get('/restaurants/bestcrim/'+$scope.state);
        request2.success(function(data) {
            $scope.data2 = data;
        });
        request2.error(function(data){
            console.log('err');
        });

        var request3 = $http.get('/restaurants/bestpoll/'+$scope.state);
        request3.success(function(data) {
            $scope.data3 = data;
        });
        request3.error(function(data){
            console.log('err');
        });
        //WORST

        var request4 = $http.get('/restaurants/worstR/'+$scope.state);
        request4.success(function(data) {
            $scope.data4 = data;
        });
        request4.error(function(data){
            console.log('err');
        });

        var request5 = $http.get('/restaurants/worstcrim/'+$scope.state);
        request5.success(function(data) {
            $scope.data5 = data;
        });
        request5.error(function(data){
            console.log('err');
        });

        var request6 = $http.get('/restaurants/worstpoll/'+$scope.state);
        request6.success(function(data) {
            $scope.data6 = data;
        });
        request6.error(function(data){
            console.log('err');
        });
    
    }; 
});

app.controller('secController', function($scope, $http) {
        $scope.message="";
        $scope.Something = function() {
            if($scope.city == ''){
                $scope.city = 'undefined';
            }
            if($scope.state == ''){
                $scope.state = 'undefined';
            }
            if($scope.zip == ''){
                $scope.zip = 'undefined';
            }

        var request = $http.get('/data/'+$scope.city+'/'+$scope.state+'/'+$scope.zip);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js