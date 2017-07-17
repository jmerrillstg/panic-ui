export default function ($http, appConfig) {

    function getLog() {
        return $http.get(appConfig.apiUrl+'/log')
        .then(function(response) {
            return response.data;
        }, function() {
            return false;
        }).catch(function() {
            return false;
        });
    }

    return {
        getLog: getLog
    };
}