import {casinoDirective} from './casino.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

export const casino = angular.module('casino', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('casino', {
      url: '/casino',
      template: '<casino></casino>',
      auth: true,
      resolve: {
        User(Auth){
          return Auth.refreshUser();
        }
      }
    })
  })
  .directive('casino', casinoDirective);
