export default function ($http, appConfig) {
    let uc = this;

    uc.users = {
        sort: {
            column: 'lastName',
            descending: false
        }
    };

    $http.get(appConfig.apiUrl+'/user').
    then(function(response) {
        uc.users.data = response.data;
    }, function () {
        uc.error='Failed to retrieve users';
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

    uc.selectedCls = selectedCls;
    uc.changeSorting = changeSorting;
}