export default function ($q, $http, appConfig) {

    function getMessage() {
        return $http.get(appConfig.apiUrl+'/message')
        .then(function(response) {
            return response.data[0].message_text;
        }, function() {
            return false;
        }).catch(function() {
            return false;
        });
    }

    function changeMessage(message) {
        let defer = $q.defer();

        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/message',
            data: {message_text: message},
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

    return {
        getMessage: getMessage,
        changeMessage: changeMessage
    };
}