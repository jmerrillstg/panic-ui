export default function (recipientsService) {
    let rc = this;

    rc.recipients = {
        sort: {
            column: 'recipient_name',
            descending: false
        }
    };

    function getRecipients () {
        recipientsService.getRecipients()
        .then(function(data) {
            rc.recipients.data = data;
        }, function () {
            rc.error='Failed to retrieve recipients';
        });
    }

    getRecipients();

    function selectedCls(module, column) {
        return column === module.sort.column && 'sort-' + module.sort.descending;
    }

    function changeSorting(module, column) {
        if (module.sort.column === column) {
            module.sort.descending = !module.sort.descending;
        } else {
            module.sort.column = column;
            module.sort.descending = false;
        }
    }

    rc.selectedCls = selectedCls;
    rc.changeSorting = changeSorting;
    rc.getRecipients = getRecipients;
}