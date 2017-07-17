export default function (loginService) {
    let cpc = this;

    cpc.currentPassword = '';
    cpc.newPassword = '';
    cpc.confirmPassword = '';
    cpc.error = '';
    cpc.success = false;

    function changePassword() {
        loginService.changePassword(cpc.currentPassword, cpc.newPassword).then(function(result) {
            if (result) {
                cpc.success = true;
                cpc.successMessage = 'Password changed successfully.';
            } else {
                cpc.error = 'Current password is invalid';
            }
        }).catch(function(error) {
            cpc.error = error;
        });
    }

    function passwordsMatch() {
        return cpc.newPassword === cpc.confirmPassword;
    }

    function canSubmit() {
        return cpc.currentPassword !== '' && cpc.newPassword !== '' && passwordsMatch() && !cpc.success;
    }

    function clearError() {
        cpc.error = '';
    }

    cpc.changePassword = changePassword;
    cpc.passwordsMatch = passwordsMatch;
    cpc.canSubmit = canSubmit;
    cpc.clearError = clearError;
}