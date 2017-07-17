export default function (loginService) {
    let auc = this;

    auc.error = '';
    auc.success = false;

    function addUser() {
        loginService.addUser(auc.user)
        .then(function() {
            auc.success = true;
            auc.successMessage = 'User Added Successfully';
            auc.error = '';
            auc.user.first_name = '';
            auc.user.last_name = '';
            auc.user.user_level = '';
            auc.user.email = '';
        },
        function(response) {
            auc.success = false;
            auc.successMessage = '';
            auc.error = 'Failed to add user. '+response.data.status;
        });
    }

    auc.addUser = addUser;
}