module.exports = function(app) {
  app.controller('ProfileController', ['$rootScope', '$scope', 'AuthService',
    function($rootScope, $scope, AuthService) {
      if (!$rootScope.user) {
        AuthService.verifySession();
        $scope.user = $rootScope.user;
      } else {
        $scope.user = $rootScope.user;
      }

      $scope.rankings = function(category) {
        var correct = $scope.user.category.correct;
        var total = $scope.user.category.total;
        return correct/total;
      };

  }])
}
