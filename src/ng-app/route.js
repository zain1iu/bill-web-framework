/**
 * Created by IntelliJ IDEA.
 * @author: liubo
 * @time: 17-4-19
 * @des: AngularJS 路由地址设置
 */

define(function (require, exports, module) {
    angular.module('app')
        .config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
            $routeProvider
                .when('/', {})
                .when('/:module', {})
                .when('/:module/', {})
                .when('/:module/:controller', {})
                .when('/:module/:controller/', {})
                .when('/:module/:controller/index', {})
                .when('/:module/:controller/:action', {});
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('requestCheckLine');
        }])
})
