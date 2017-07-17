export default function ($rootScope, appConfig, loginService) {
    let acc = this;

    acc.error = '';
    acc.success = false;

    function updateProfile() {
        loginService.updateProfile()
        .then(function() {
            acc.success = true;
            acc.successMessage = 'User Updated Successfully';
        },
        function() {
            acc.error = 'User Update Failed';
        });
    }

    acc.updateProfile = updateProfile;
}