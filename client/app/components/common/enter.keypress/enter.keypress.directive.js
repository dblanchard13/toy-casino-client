export const enterKeypressDirective = () => {
  return (scope, element, attr) => {
    element.bind("keydown keypress", (event) => {

      if(event.which === 13) {
        scope.$apply(() => { scope.$eval(attr.ngEnter); })

        event.preventDefault();
      }
    });

  }
};
