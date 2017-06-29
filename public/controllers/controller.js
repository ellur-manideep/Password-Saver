var MyPwd = angular.module("MyPwd", ['ngRoute', 'ngMaterial', 'ngSanitize']);

MyPwd.config(['$routeProvider', function ($routeProvider){
  $routeProvider
  .when('/main',{
    templateUrl: 'views/main.html',
    controller: 'PwdCtrl'
  })
  .when('/add',{
    templateUrl: 'views/add.html',
    controller: 'PwdCtrl'
  })
  .when('/show',{
    templateUrl: 'views/show.html',
    controller: 'PwdCtrl'
  })
  .otherwise({
    redirectTo: '/main'
  });
}]);

MyPwd.controller('PwdCtrl',['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){

  $scope.addNew = function(){
    $location.path('/add');
  }

  $scope.insert = function(website, username, password) {
    var values = {
      webName : website,
      userName : username,
      pwd : password
    };
    $http({
      method: 'POST',
      url: '/insert',
      data: values
    })
    .then(function(response){
      console.log(response.data);
      $location.path('/show');
    });

  }

  $scope.showData = function(){
    $location.path('/show');
  }
  $http({
    method: 'GET',
    url: '/getData'
  })
  .then(function(response){
    console.log(response.data);
    $window.dat = response.data;
    $scope.values = $window.dat;
    console.log($scope.values);
  });

}]);
