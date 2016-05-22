import {atmDirective} from './atm.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const atm = angular.module('atm', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('atm', {
      url: '/atm',
      template: '<atm></atm>',
      resolve: {
        Balance(Auth, Bank){
          let currentUser = Auth.getUser();
          return Bank.getBalance(currentUser._id)
        } 
      }
    })
  })
  .directive('atm', atmDirective);
