import angular from 'angular';
import {textboxDirective} from './textbox/textbox.directive';
import {capitalizeFilter} from './capitalize/capitalize.filter';
import {enterKeypressDirective} from './enter.keypress/enter.keypress.directive';

export const common = angular.module('common', [])
  .directive('textbox', textboxDirective)
  .directive('ngEnter', enterKeypressDirective)
  .filter('capitalize', capitalizeFilter);
