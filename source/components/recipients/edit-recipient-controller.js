export default function ($routeParams, loginService, recipientsService) {
    let erc = this;

    erc.error = '';
    erc.success = false;

    function getRecipient() {
        recipientsService.getRecipient($routeParams.id)
        .then(function(data) {
            erc.recipient = data;
        }, function () {
            erc.error='Failed to retrieve recipient';
        });
    }

    getRecipient();

    function updateRecipient() {
        recipientsService.updateRecipient($routeParams.id, erc.recipient)
        .then(function() {
            erc.success = true;
            erc.successMessage = 'Recipient Updated Successfully';
        },
        function() {
            erc.error = 'Recipient Update Failed';
        });
    }

    function deleteRecipient() {
        recipientsService.deleteRecipient($routeParams.id)
        .then(function() {
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

    erc.getRecipient = getRecipient;
    erc.deleteRecipient = deleteRecipient;
    erc.updateRecipient = updateRecipient;
    erc.initiateModal = initiateModal;
}