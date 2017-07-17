export default function (loginService) {
    let uc = this;

    uc.users = {
        sort: {
            column: 'user_name',
            descending: false
        }
    };

    function getUsers() {
        loginService.getUsers()
        .then(function(data) {
            uc.users.data = data;
        }, function () {
            uc.error='Failed to retrieve users';
        });
    }

    getUsers();

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
    uc.getUsers = getUsers;
}