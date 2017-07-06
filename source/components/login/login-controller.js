export default function (loginService, $rootScope, $location) {
    let lc = this;

    lc.inputEmail = '';
    lc.inputPassword = '';

    lc.error = '';
    lc.success = false;

    function login() {
        loginService.loginUser(lc.inputEmail, lc.inputPassword).then(function (data) {
            if (data) {
                $rootScope.isLoggedIn = true;
                $location.path('/home');
            } else {
                lc.success = false;
                lc.successMessage = '';
                lc.error='Login failed';
            }
        }).catch(function (error) {
            alert('An error occurred.\n'+error);
        });
    }

    function resetPassword() {
        loginService.resetPassword(lc.inputEmail).then(
            function() {
                lc.success=true;
                lc.successMessage='Password Reset Email Sent';
                lc.error='';
            },
            function(response) {
                lc.success = false;
                lc.successMessage = '';
                lc.error='Password reset failed: '+response.data.status;
            });
    }

    lc.resetPassword = resetPassword;
    lc.login = login;
}