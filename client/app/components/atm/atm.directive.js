import './atm.styl';
import {AtmController as controller} from './atm.controller';
import template from './atm.html';

export const atmDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};
