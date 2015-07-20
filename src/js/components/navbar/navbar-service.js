angular.module('app.navbar.service', [])
.factory('NavbarService', function($http, configUrls) {
  var serviceMethods = {
    getTabsData: function(success, error) {
      $http.get(configUrls.tabs)
      .success(function(data, status, headers, config) {
        success(data);
      })
      .error(function(data, status, headers, config) {
        error(status);
      });
    }
  };

  return serviceMethods;
});
