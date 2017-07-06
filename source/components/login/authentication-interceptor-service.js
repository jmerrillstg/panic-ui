export default function ($injector, appConfig) {
    return {
        // automatically attach Authorization header
        request: function(config) {
            if(config.url.indexOf(appConfig.apiUrl+'/auth') < 0 && config.url.indexOf(appConfig.apiUrl) >= 0) {
                let token = $injector.get('loginService').getToken();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
            }

            return config;
        },

        // If a token was sent back, save it
        response: function(res) {
            if(res.config.url.indexOf(appConfig.apiUrl+'/auth') >= 0 && res.data.token) {
                let loginService = $injector.get('loginService');
                loginService.saveToken(res.data.token);
            }

            return res;
        },
    };
}