import './rules.styl';
import {RulesController as controller} from './rules.controller';
import template from './rules.html';

export const rulesDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};
