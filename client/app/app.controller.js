class AppController {
  constructor(Auth, $state) {
    this.$state = $state;
    this.Auth = Auth;
  }

  logout(){
    this.Auth.logout();
    this.$state.go('home');
  }

  loggedIn(){
    return this.Auth.isAuth();
  }
};

AppController.$inject = ['Auth', '$state'];

export {AppController};
