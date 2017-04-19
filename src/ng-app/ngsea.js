/**
 * Created by IntelliJ IDEA.
 * @author: liubo
 * @time: 17-4-19
 * @des: sea根据模块按需引入页面控制器
 */

define(function (require, exports, module) {
    angular.module('ngsea', [], ["$controllerProvider", "$compileProvider", "$filterProvider", "$provide",
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            $provide.factory('$ngsea', ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {
                return function (app, settings) {
                    $rootScope.activeApply = function (fn) {
                        var phase = this.$root.$$phase;
                        if (phase == '$apply' || phase == '$digest') {
                            if (fn && (typeof(fn) === 'function')) {
                                fn();
                            }
                        } else {
                            this.$apply(fn);
                        }
                    };

                    //初始化页面路由默认配置
                    var defaults = {
                        tpl_path: seajs.data.base + 'src/module/',
                        tpl_ext: '.html',
                        mod_path: 'src/module/',
                        module: 'home',
                        controller: 'index',
                        action: 'index',
                        version: ''
                    };

                    angular.extend(defaults, settings);

                    var register = {
                        controller: $controllerProvider.register,
                        directive: $compileProvider.directive,
                        filter: $filterProvider.register,
                        factory: $provide.factory,
                        service: $provide.service,
                        decorator: $provide.decorator
                    };

                    $rootScope.$on('$routeChangeStart', function (e, target) {
                        // if(target.loadedTemplateUrl.indexOf(city)!=-1){
                        //     F.location();
                        // }
                        var route = target && target.$$route || {};
                        angular.extend(route, route_format(target.params));
                        route.resolve = route.resolve || {};
                        route.resolve.loadedModule = function () {
                            var deferred = $q.defer();
                            seajs.use(route.controllerUrl, function (m) {
                                $rootScope.activeApply(function () {
                                    if (angular.isUndefined(m)) {
                                        deferred.reject(m);
                                        $location.url('/')
                                    } else {
                                        register.cname = route.cname;
                                        deferred.resolve(angular.isFunction(m) ? m(register, app) : m);
                                    }
                                });
                            });
                            return deferred.promise;
                        }
                    });

                    var route_format = function (params) {
                        params.module = params.module || defaults.module;
                        params.controller = params.controller || defaults.controller;
                        params.action = params.action || defaults.action;
                        return {
                            controller: params.module + '_' + params.controller + '_' + params.action,
                            templateUrl: defaults.tpl_path + params.module + '/' + params.controller + '/view/' + params.action + defaults.tpl_ext + '?v=' + defaults.version,
                            controllerUrl: defaults.mod_path + params.module + '/' + params.controller + '/ctrl/' + params.action,
                            cname: params.module + '_' + params.controller + '_' + params.action
                        }
                    }
                }

            }])
        }])
})
