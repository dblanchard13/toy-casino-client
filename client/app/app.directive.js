import './app.styl';
import {AppController as controller} from './app.controller.js';
import template from './app.html';

export const appDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    restrict: 'E',
    scope: {},
    replace: true
  };
};
