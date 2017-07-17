export default function (logService) {
    let lgc = this;

    lgc.error = '';
    lgc.success = false;

    function getLog() {
        logService.getLog()
        .then(function(data) {
            lgc.log_count = data.count;
            lgc.log = data.log;
        }, function () {
            lgc.error='Failed to retrieve log';
        });
    }

    getLog();

    lgc.getLog = getLog;
}