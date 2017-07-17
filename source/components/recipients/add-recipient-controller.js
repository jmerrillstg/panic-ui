export default function (recipientsService) {
    let arc = this;

    arc.error = '';
    arc.success = false;

    function addRecipient() {
        recipientsService.addRecipient(arc.recipient)
        .then(function() {
            arc.success = true;
            arc.successMessage = 'Recipient Added Successfully';
            arc.error = '';
            arc.recipient.first_name = '';
            arc.recipient.last_name = '';
            arc.recipient.recipient_phone = '';
            arc.recipient.email = '';
        },
        function() {
            arc.success = false;
            arc.successMessage = '';
            arc.error = 'Failed to add recipient';
        });
    }

    arc.addRecipient = addRecipient;
}