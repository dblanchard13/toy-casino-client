import './casino.styl';
import {CasinoController as controller} from './casino.controller';
import template from './casino.html';

export const casinoDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};
