export default function ($q, $http, $window, $rootScope, $location, appConfig) {
    function loginUser(username, password) {
        let defer = $q.defer();
        let self = this;
        $http({
            method: 'POST',
            url: appConfig.apiUrl+'/auth',
            data: {username: username, password: password},
            headers : {'Content-Type': 'application/json'}
        }).then(function(resp) {
            if (resp.data && resp.data.token) {
                self.activeUser = self.parseToken(resp.data.token).id;
            }
            defer.resolve(true);
        }, function(response) {
            if (response.status === 405) { // also for bad username / password
                defer.resolve(false);
            } else if (response.status === 304) {
                defer.resolve(true); // login worked, whatever.
            } else {
                defer.resolve(false);
            }
        }).catch(function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    function clearToken() {
        $window.localStorage.clear();
    }

    function getToken() {
        return $window.localStorage['panic_jwtToken'];
    }

    function isAuthenticated() {
        let token = this.getToken();

        return !!token;
    }

    function getUser(userId) {
        return $http.get(appConfig.apiUrl+'/user/'+userId).then(function(response) {
            return response.data[0];
        });
    }

    function getUsers() {
        return $http.get(appConfig.apiUrl+'/user').then(function(response) {
            return response.data;
        });
    }

    function isAdmin(userId) {
        return this.getUser(userId).then(function(user) {
            return user.user_level === 'admin';
        });
    }

    function parseToken(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    }

    function getUserId() {
        return parseToken(getToken()).id;
    }

    function saveToken(token) {
        $window.localStorage['panic_jwtToken'] = token;
    }

    function getActiveUser() {
        return this.activeUser;
    }

    function changePassword(oldPassword, newPassword) {
        let defer = $q.defer();

        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/change-password',
            data: {oldPassword: oldPassword, newPassword: newPassword},
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

    function resetPassword(email) {
        return $http.get(appConfig.apiUrl+'/reset-password/'+email).then(
            function(response) {
                return response.data;
            }).catch(
            function(error) {
                return $q.reject(error);
            }
        );
    }

    function logoutUser() {
        clearToken();
        $rootScope.isLoggedIn = false;
        $location.path('/login');
    }

    function updateProfile() {
        let defer = $q.defer();

        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/profile',
            data: $rootScope.user,
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

    function updateUser(userId, user) {
        let defer = $q.defer();

        $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/user/'+userId,
            data: {user_name: user.user_name, user_level: user.user_level, user_email: user.user_email},
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

    function addUser(user) {
        let defer = $q.defer();

        $http({
            method: 'POST',
            url: appConfig.apiUrl+'/user',
            data: {user_name: user.first_name+' '+user.last_name, user_level: user.user_level, email: user.email},
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

    function deleteUser(userId) {
        let defer = $q.defer();

        $http.delete(appConfig.apiUrl+'/user/'+userId)
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
        loginUser: loginUser,
        logoutUser: logoutUser,
        getActiveUser: getActiveUser,
        getToken: getToken,
        clearToken: clearToken,
        getUserId: getUserId,
        getUser: getUser,
        saveToken: saveToken,
        isAuthenticated: isAuthenticated,
        isAdmin: isAdmin,
        parseToken: parseToken,
        changePassword: changePassword,
        resetPassword: resetPassword,
        updateProfile: updateProfile,
        updateUser: updateUser,
        addUser: addUser,
        deleteUser: deleteUser,
        getUsers: getUsers
    };
}

