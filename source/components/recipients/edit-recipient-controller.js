export default function ($http, $routeParams, loginService, appConfig) {
    let erc = this;

    erc.error = '';
    erc.success = false;

    $http.get(appConfig.apiUrl+'/recipient/'+$routeParams.id).
    then(function(response) {
        erc.recipient = response.data[0];
    }, function () {
        erc.error='Failed to retrieve recipient';
    });

    function updateRecipient() {
        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/recipient/'+$routeParams.id,
            data: {recipient_name: erc.recipient.recipient_name, recipient_phone: erc.recipient.recipient_phone, recipient_email: erc.recipient.recipient_email},
            headers : {'Content-Type': 'application/json'}
        })
        .then(function() {
            erc.success = true;
            erc.successMessage = 'Recipient Updated Successfully';
        },
        function() {
            erc.error = 'Recipient Update Failed';
        });
    }

    function resetPassword(email) {
        if (loginService.resetPassword(email)) {
            erc.success = true;
            erc.successMessage = 'Password Reset Sent Successfully';
            erc.error = '';
        } else {
            erc.success = false;
            erc.successMessage = '';
            erc.error = 'Password Reset Failed';
        }
    }

    function deleteRecipient() {
        $http.delete(appConfig.apiUrl+'/recipient/'+$routeParams.id).
        then(function() {
            erc.success = true;
            erc.successMessage = 'Recipient Deleted Successfully';
            erc.recipient = '';
        },
        function() {
            erc.error = 'Recipient Delete Failed';
        });
    }

    function initiateModal() {
        $('#delete-recipient-modal').modal();
    }

    erc.deleteRecipient = deleteRecipient;
    erc.updateRecipient = updateRecipient;
    erc.resetPassword = resetPassword;
    erc.initiateModal = initiateModal;
}