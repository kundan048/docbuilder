
var myApp = angular.module("myApp",[]);

myApp.controller('myAppController', function($scope){
    $scope.appName = "Hello";
    $scope.$watch('appName',function(val,old){
        $scope.appName = val; 
     });
    // console.log($scope);
});