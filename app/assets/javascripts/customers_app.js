var app = angular.module('customers', ['ngRoute', 'ngResource', 'templates']);

app.controller("CustomerSearchController", ["$scope", "$http", "$location", function($scope, $http, $location) {
  var page = 0;

  $scope.customers = [];

  $scope.previousPage = function() {
    if (page > 0) {
      page = page - 1;
      $scope.search($scope.keywords);
    }
  }

  $scope.nextPage = function() {
    page = page + 1;
    $scope.search($scope.keywords);
  }

  $scope.search = function(searchTerm) {
    if (searchTerm.length < 3) {
      return;
    }

    $http.get("/customers.json", 
                {"params": {"keywords": searchTerm, "page": page} }
    ).then(function(response) {
      $scope.customers = response.data;
    },function(response) {
        alert("There was a problem: " + response.status);  
      }
    );
  }

  $scope.viewDetails = function(customer) {
    $location.path("/" + customer.id);
  }
}]);


app.controller("CustomerDetailController",["$scope", "$http", "$routeParams", "$resource", function($scope, $http, $routeParams, $resource) {
  
  $scope.customer = {};
  var customerId = $routeParams.id;
  var Customer = $resource('/customers/:customerId.json');

  $scope.customer = Customer.get({ "customerId": customerId})
  
  console.log($scope.customer);

}]);

app.controller("CustomerCreditCardController",["$scope", "$resource", function($scope, $resource) {
  var CreditCardInfo = $resource('/fake_billing.json')
  $scope.creditCard = CreditCardInfo.get({ "cardholder_id": 1234})
}]);


app.config(["$routeProvider", function($routeProvider) {

  $routeProvider.when("/", {
    controller: "CustomerSearchController",
    templateUrl: "customer_search.html"
  }).when("/:id", {
    controller: "CustomerDetailController",
    templateUrl: "customer_detail.html"
  });

}]);
