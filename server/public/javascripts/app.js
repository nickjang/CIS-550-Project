var app = angular.module('angularjsNodejsTutorial',[]);
//var request=require('request');

app.controller('myController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request2 = $http.get('/restaurants/'+$scope.state);
        request2.success(function(data) {
            $scope.data = data;
        });
        request2.error(function(data){
            console.log('err');
        });
    
    }; 
});

app.controller('secController', function($scope, $http) {
        $scope.message="";
        $scope.Something = function() {
        // var request = $http.get('/data/'+$scope.login+'/'+$scope.name+'/'+$scope.sex+'/'+$scope.RelationshipStatus+'/'+$scope.Birthyear);
        // request.success(function(data) {
        //     $scope.data = data;
        // });
        // request.error(function(data){
        //     console.log('err');
        // });
    
    }; 
});

// app.controller('friendController', function($scope, $http) {
//         $scope.message="";
//         $scope.Submit = function() {
//         var request2 = $http.get('/fdata/'+$scope.email);
//         request2.success(function(data) {
//             $scope.data = data;
//         });
//         request2.error(function(data){
//             console.log('err');
//         });
    
//     }; 
// });

// app.controller('familyController', function($scope, $http) {
//         var request = $http.get('/fams');
//         request.success(function(data) {
//             $scope.families = data;
//         });
//         request.error(function(data){
//             console.log('err');
//         });
//         //$scope.families = ["web", "webber", "nation"];

//         $scope.message="";
//         $scope.Submit = function(selectedFamily) {
//         var request2 = $http.get('/famdata/'+selectedFamily.login);
//         request2.success(function(data) {
//             $scope.data = data;
//         });
//         request2.error(function(data){
//             console.log('err');
//         });
    
//     }; 
// });

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js