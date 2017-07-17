var app = angular.module('panicUiApp', ['ngRoute', 'ngSanitize', 'angularMoment', 'panicUi.config']);

import navMenuController from '../components/common/nav-menu/nav-menu-controller';
import navMenu from '../components/common/nav-menu/nav-menu-directive';
import pageFooter from '../components/common/page-footer/page-footer-directive';
import homeController from '../components/home/home-controller';
import homeService from '../components/home/home-service';
import accountController from '../components/account/account-controller';
import logController from '../components/log/log-controller';
import logService from '../components/log/log-service';
import loginController from '../components/login/login-controller';
import loginService from '../components/login/login-service';
import authenticationInterceptor from '../components/login/authentication-interceptor-service';
import changePasswordController from '../components/account/change-password-controller';
import usersController from '../components/users/users-controller';
import addUserController from '../components/users/add-user-controller';
import editUserController from '../components/users/edit-user-controller';
import deleteUserModal from '../components/users/delete-user-modal-directive';
import recipientsController from '../components/recipients/recipients-controller';
import recipientsService from '../components/recipients/recipients-service';
import addRecipientController from '../components/recipients/add-recipient-controller';
import editRecipientController from '../components/recipients/edit-recipient-controller';
import deleteRecipientModal from '../components/recipients/delete-recipient-modal-directive';

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/home', {
            templateUrl: 'components/home/home-template.html',
            controller: 'homeController',
            controllerAs: 'hc',
            activeTab: 'home'
        })
        .when('/account', {
            templateUrl: 'components/account/account-template.html',
            controller: 'accountController',
            controllerAs: 'acc',
            activeTab: 'account'
        })
        .when('/change-password', {
            templateUrl: 'components/account/change-password-template.html',
            controller: 'changePasswordController',
            controllerAs: 'cpc',
            activeTab: 'account'
        })
        .when('/reset-password', {
            templateUrl: 'components/login/reset-password-template.html',
            controller: 'loginController',
            controllerAs: 'lc',
            activeTab: 'login'
        })
        .when('/log', {
            templateUrl: 'components/log/log-template.html',
            controller: 'logController',
            controllerAs: 'lgc',
            activeTab: 'log'
        })
        .when('/login', {
            templateUrl: 'components/login/login-template.html',
            controller: 'loginController',
            controllerAs: 'lc',
            activeTab: 'login'
        })
        .when('/users', {
            templateUrl: 'components/users/users-template.html',
            controller: 'usersController',
            controllerAs: 'uc',
            activeTab: 'users'
        })
        .when('/add-user', {
            templateUrl: 'components/users/add-user-template.html',
            controller: 'addUserController',
            controllerAs: 'auc',
            activeTab: 'users'
        })
        .when('/edit-user/:id', {
            templateUrl: 'components/users/edit-user-template.html',
            controller: 'editUserController',
            controllerAs: 'euc',
            activeTab: 'users'
        })
        .when('/recipients', {
            templateUrl: 'components/recipients/recipients-template.html',
            controller: 'recipientsController',
            controllerAs: 'rc',
            activeTab: 'recipients'
        })
        .when('/add-recipient', {
            templateUrl: 'components/recipients/add-recipient-template.html',
            controller: 'addRecipientController',
            controllerAs: 'arc',
            activeTab: 'recipients'
        })
        .when('/edit-recipient/:id', {
            templateUrl: 'components/recipients/edit-recipient-template.html',
            controller: 'editRecipientController',
            controllerAs: 'erc',
            activeTab: 'recipients'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

app.controller('navMenuController', navMenuController);
app.directive('navMenu', navMenu);
app.directive('pageFooter', pageFooter);
app.controller('homeController', homeController);
app.factory('homeService', homeService);
app.controller('accountController', accountController);
app.controller('logController', logController);
app.factory('logService', logService);
app.controller('loginController', loginController);
app.factory('loginService', loginService);
app.factory('authenticationInterceptor', authenticationInterceptor);
app.controller('changePasswordController', changePasswordController);
app.controller('usersController', usersController);
app.controller('addUserController', addUserController);
app.controller('editUserController', editUserController);
app.directive('deleteUserModal', deleteUserModal);
app.controller('recipientsController', recipientsController);
app.factory('recipientsService', recipientsService);
app.controller('addRecipientController', addRecipientController);
app.controller('editRecipientController', editRecipientController);
app.directive('deleteRecipientModal', deleteRecipientModal);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
});

app.run(function ($rootScope, $location, loginService) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoggedIn = loginService.isAuthenticated();
        if ($rootScope.isLoggedIn === true) {
            $rootScope.userId = loginService.getUserId();
            loginService.getUser($rootScope.userId).then(function(user) {
                $rootScope.user=user;
                $rootScope.isAdmin = $rootScope.user.user_level === 'admin';
                if($rootScope.user.password_mustchange===1) {
                    $location.path('/change-password');
                }
            });
        } else {
            if ($location.path().includes('reset-password') === false) {
                $location.path('/login');
            }
        }
    });
});