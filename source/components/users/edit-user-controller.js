export default function ($http, $routeParams, loginService, appConfig) {
    let euc = this;

    euc.error = '';
    euc.success = false;

    $http.get(appConfig.apiUrl+'/user/'+$routeParams.id).
    then(function(response) {
        euc.user = response.data[0];
    }, function () {
        euc.error='Failed to retrieve user';
    });

    function updateUser() {
        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/user/'+$routeParams.id,
            data: {source_name: euc.user.source_name, user_level: euc.user.user_level, source_email: euc.user.source_email},
            headers : {'Content-Type': 'application/json'}
        })
        .then(function() {
            euc.success = true;
            euc.successMessage = 'User Updated Successfully';
        },
        function() {
            euc.error = 'User Update Failed';
        });
    }

    function resetPassword(email) {
        if (loginService.resetPassword(email)) {
            euc.success = true;
            euc.successMessage = 'Password Reset Sent Successfully';
            euc.error = '';
        } else {
            euc.success = false;
            euc.successMessage = '';
            euc.error = 'Password Reset Failed';
        }
    }

    function deleteUser() {
        $http.delete(appConfig.apiUrl+'/user/'+$routeParams.id).
        then(function() {
            euc.success = true;
            euc.successMessage = 'User Deleted Successfully';
            euc.user = '';
        },
        function() {
            euc.error = 'User Delete Failed';
        });
    }

    function initiateModal() {
        $('#delete-user-modal').modal();
    }

    euc.deleteUser = deleteUser;
    euc.updateUser = updateUser;
    euc.resetPassword = resetPassword;
    euc.initiateModal = initiateModal;
}