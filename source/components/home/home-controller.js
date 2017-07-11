export default function ($http, appConfig) {
    let hc = this;

    hc.error = '';
    hc.success = false;

    $http.get(appConfig.apiUrl+'/message').
    then(function(response) {
        hc.message = response.data[0].message_text;
    }, function () {
        hc.error='Failed to retrieve message';
    });

    function updateMessage() {
        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/message',
            data: {message_text: hc.message},
            headers : {'Content-Type': 'application/json'}
        })
        .then(function() {
            hc.success = true;
            hc.successMessage = 'Message Updated Successfully';
        },
        function() {
            hc.error = 'Message Update Failed';
        });
    }

    hc.updateMessage = updateMessage;
}