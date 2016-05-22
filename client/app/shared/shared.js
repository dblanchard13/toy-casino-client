import {api} from './api';
import {bank} from './bank';
import {auth} from './auth';
import ngJwt from 'angular-jwt';
import angular from 'angular';
import log from 'db.log';

export const shared = angular.module('shared', [ngJwt])
  .constant('API', api)
  .factory('Bank', bank)
  .factory('Auth', auth)
  .config(($httpProvider, jwtInterceptorProvider) => {
    jwtInterceptorProvider.tokenGetter = () => {
      return localStorage.getItem('ngblog-token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(($state, $rootScope, Auth) => {
    $rootScope.$on('$stateChangeStart', (e, toState, ...rest) => {
      if (toState.auth && !Auth.isAuth()) {
        e.preventDefault();
        $state.go('auth');
      }
    });
  });

