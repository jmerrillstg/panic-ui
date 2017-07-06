export default function() {
    return {
        restrict: 'E',         // (2)
        replace: true,         // (3)
        transclude: true,      // (4)
        templateUrl: 'components/users/delete-user-modal-template.html',    // (5)
        controller: 'editUserController',
        controllerAs: 'euc'
    };
}