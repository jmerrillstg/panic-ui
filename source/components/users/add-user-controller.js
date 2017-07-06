export default function ($http, appConfig) {
    let auc = this;

    auc.error = '';
    auc.success = false;

    function addUser() {
        $http({
            method: 'POST',
            url: appConfig.apiUrl+'/user',
            data: {first_name: auc.user.first_name, last_name: auc.user.last_name, user_level: auc.user.user_level, email: auc.user.email},
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        })
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