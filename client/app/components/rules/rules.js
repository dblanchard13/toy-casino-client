import {rulesDirective} from './rules.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const rules = angular.module('rules', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('rules', {
      url: '/rules',
      template: '<rules></rules>'
    })
  })
  .directive('rules', rulesDirective);
