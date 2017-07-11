export default function ($http, appConfig) {
    let rc = this;

    rc.recipients = {
        sort: {
            column: 'recipient_name',
            descending: false
        }
    };

    $http.get(appConfig.apiUrl+'/recipient').
    then(function(response) {
        rc.recipients.data = response.data;
    }, function () {
        rc.error='Failed to retrieve recipients';
    });

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
}