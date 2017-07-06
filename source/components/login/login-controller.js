export default function (loginService, $rootScope, $location) {
    let lc = this;

    lc.inputEmail = '';
    lc.inputPassword = '';

    function login() {
        loginService.loginUser(lc.inputEmail, lc.inputPassword).then(function (data) {
            if (data) {
                $rootScope.isLoggedIn = true;
                $location.path('/home');
            } else {
                alert('login failed');
            }
        }).catch(function (error) {
            alert('An error occurred.\n'+error);
        });
    }

    lc.login = login;
}