app.directive('customerSummary', function () {
  return {
    "scope": {
      "customer": "=",
      "viewDetailsFunction": "="
    },
    "templateUrl": "customer_summary.html"
  }
});