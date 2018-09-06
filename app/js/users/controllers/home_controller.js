module.exports = function(app) {
  app.controller('HomeController', ['$rootScope', '$scope', '$location', '$http', 'AuthService',
   function($rootScope, $scope, $location, $http, AuthService) {

    console.log("hello from home controller");
    if (!$rootScope.user) AuthService.verifySession();

    $scope.newGame = function(category) {
      //request category data
      console.log('category', category);

      $http.get('/api/categories/' + category)
      .then(function(res){
        console.log("success! res:");
        console.log(res);
        $rootScope.gameData = {};
        // res will have the category data
        console.log('RESPONSE ', res.data.msg);
        $rootScope.gameData.questions = res.data.msg;
        $rootScope.gameData.category = res.data.category;
        $location.path('/newgame');
      }, function(res) {
        console.log("hmmmm... res: " + res);
      });
    };

    $scope.viewProfile = function() {
      $location.path('/profile');
    };

    $scope.logout = function() {
      AuthService.setToken();
      $location.path('/signin');
    };
  }]);
};
