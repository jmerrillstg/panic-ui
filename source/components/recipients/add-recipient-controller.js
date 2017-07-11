export default function ($http, appConfig) {
    let arc = this;

    arc.error = '';
    arc.success = false;

    function addRecipient() {
        $http({
            method: 'POST',
            url: appConfig.apiUrl+'/recipient',
            data: {name: arc.recipient.first_name+' '+arc.recipient.last_name, phone: arc.recipient.recipient_phone, email: arc.recipient.email},
            headers : {'Content-Type': 'application/json'}
        })
        .then(function() {
            arc.success = true;
            arc.successMessage = 'Recipient Added Successfully';
            arc.error = '';
            arc.recipient.first_name = '';
            arc.recipient.last_name = '';
            arc.recipient.recipient_phone = '';
            arc.recipient.email = '';
        },
        function(response) {
            arc.success = false;
            arc.successMessage = '';
            arc.error = 'Failed to add recipient. '+response.data.status;
        });
    }

    arc.addRecipient = addRecipient;
}