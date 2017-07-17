export default function (homeService) {
    let hc = this;

    hc.error = '';
    hc.success = false;

    function getMessage() {
        homeService.getMessage()
        .then(function(data) {
            hc.message = data;
        }, function() {
            hc.success = false;
            hc.error = 'Failed to retrieve message';
        });
    }

    function updateMessage() {
        homeService.changeMessage(hc.message)
        .then(function(){
            hc.success = true;
            hc.successMessage = 'Message updated successfully.';
        }, function() {
            hc.success = false;
            hc.error = 'Message failed to update';
        });
    }

    getMessage();

    hc.updateMessage = updateMessage;
    hc.getMessage = getMessage;
}