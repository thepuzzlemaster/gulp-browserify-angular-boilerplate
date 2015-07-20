require('./navbar-template.ngt');

angular.module('app.navbar.directive', ['app.navbar.service'])
.directive('rexNavbar', function(NavbarService) {

  return {
    restrict: 'E',
    templateUrl: 'navbar-template.ngt',
    controller: function($scope, $element) {
      var activeId = 0;
      NavbarService.getTabsData(
        // success
        function(data) {
          $scope.tabs = data;
        },

        // error
        function(status) {
          console.error('error loading tabs data', status);
        });

      $scope.isActive = function(tab) {
        return tab.id === activeId;
      };

      this.setActive = function(tab) {
        activeId = tab.id;
      };
    }
  }
});
