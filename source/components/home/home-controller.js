export default function ($http, appConfig) {
    let hc = this;
    $http.get(appConfig.apiUrl+'/year').
    then(function(response) {
        hc.previousYear = response.data.previousYear;
        hc.currentYear = response.data.activeYear;
        $http.get(appConfig.apiUrl+'/album?year='+hc.previousYear).
        then(function(response) {
            hc.previousAlbums = response.data;
        });
        $http.get(appConfig.apiUrl+'/album?year='+hc.currentYear).
        then(function(response) {
            hc.currentAlbums = response.data;
        });
    });
}