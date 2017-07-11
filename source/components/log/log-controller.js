export default function ($http, appConfig) {
    let lgc = this;

    lgc.error = '';
    lgc.success = false;

    $http.get(appConfig.apiUrl+'/log').
    then(function(response) {
        lgc.log_count = response.data.count;
        lgc.log = response.data.log;
    }, function () {
        lgc.error='Failed to retrieve log';
    });

}