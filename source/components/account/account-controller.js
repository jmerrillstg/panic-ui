export default function ($http, $rootScope, appConfig) {
    let acc = this;

    acc.error = '';
    acc.success = false;

    $http.get(appConfig.apiUrl+'/user/'+$rootScope.userId).
    then(function(response) {
        acc.profile = response.data[0];
    }, function () {
        acc.error = 'Failed to retrieve profile';
    });

    function updateUser() {
        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/profile/'+$rootScope.userId,
            data: acc.profile,
            headers : {'Content-Type': 'application/json'}
        })
        .then(function() {
            acc.success = true;
            acc.successMessage = 'User Updated Successfully';
        },
        function() {
            acc.error = 'User Update Failed';
        });
    }

    acc.updateUser = updateUser;
}