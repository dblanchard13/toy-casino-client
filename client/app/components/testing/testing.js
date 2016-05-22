import {testingDirective} from './testing.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const testing = angular.module('testing', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('testing', {
      url: '/testing',
      template: '<testing></testing>'
    })
  })
  .directive('testing', testingDirective);
