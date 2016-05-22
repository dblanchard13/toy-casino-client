import './testing.styl';
import {TestingController as controller} from './testing.controller';
import template from './testing.html';

export const testingDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};
