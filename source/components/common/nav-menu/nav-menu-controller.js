export default function ($scope, $route, loginService) {
    $scope.$route = $route;

    function logout() {
        loginService.logoutUser();
    }

    $scope.logout = logout;
}