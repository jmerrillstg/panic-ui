export default function() {
    return {
        restrict: 'E',         // (2)
        replace: true,         // (3)
        transclude: true,      // (4)
        templateUrl: 'components/recipients/delete-recipient-modal-template.html',    // (5)
        controller: 'editRecipientController',
        controllerAs: 'erc'
    };
}