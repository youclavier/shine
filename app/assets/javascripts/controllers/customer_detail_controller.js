app.controller("CustomerDetailController",["$scope", "$http", "$routeParams", "$resource", function($scope, $http, $routeParams, $resource) {
  
  $scope.customer = {};
  $scope.customerId = $routeParams.id;
  var Customer = $resource('/customers/:customerId.json', {"customerId": "@customer_id"}, { "save": { "method": "PUT"}});

  $scope.customer = Customer.get({ "customerId": $scope.customerId})
  
  $scope.save = function() {
    if ($scope.form.$valid) {
      $scope.customer.$save(function() {
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
        alert("Save Successful!");
      }, function() {
          alert("Save Failed :");
      });
    }
  }

}]);