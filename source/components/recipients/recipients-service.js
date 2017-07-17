export default function ($q, $http, appConfig) {

    function getRecipients() {
        return $http.get(appConfig.apiUrl+'/recipient')
        .then(function(response) {
            return response.data;
        }, function() {
            return false;
        }).catch(function() {
            return false;
        });
    }

    function getRecipient(recipientId) {
        return $http.get(appConfig.apiUrl+'/recipient/'+recipientId)
        .then(function(response) {
            return response.data[0];
        }, function() {
            return false;
        }).catch(function() {
            return false;
        });
    }

    function updateRecipient(recipientId, recipient) {
        let defer = $q.defer();

        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/recipient/'+recipientId,
            data: {recipient_name: recipient.recipient_name, recipient_phone: recipient.recipient_phone, recipient_email: recipient.recipient_email},
            headers : {'Content-Type': 'application/json'}
        }).then(function() {
            defer.resolve(true);
        }, function() {
            defer.resolve(false);
        }).catch(function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    function addRecipient(recipient) {
        let defer = $q.defer();

        $http({
            method: 'POST',
            url: appConfig.apiUrl+'/recipient',
            data: {name: recipient.first_name+' '+recipient.last_name, phone: recipient.recipient_phone, email: recipient.email},
            headers : {'Content-Type': 'application/json'}
        }).then(function() {
            defer.resolve(true);
        }, function() {
            defer.resolve(false);
        }).catch(function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    function deleteRecipient(recipientId) {
        let defer = $q.defer();

        $http.delete(appConfig.apiUrl+'/recipient/'+recipientId)
        .then(function() {
            defer.resolve(true);
        }, function() {
            defer.resolve(false);
        }).catch(function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    return {
        getRecipients: getRecipients,
        getRecipient: getRecipient,
        addRecipient: addRecipient,
        updateRecipient: updateRecipient,
        deleteRecipient: deleteRecipient
    };
}