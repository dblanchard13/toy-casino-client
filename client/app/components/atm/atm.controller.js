class AtmController {
  constructor(Auth, Bank, $timeout, $state) {
    this.greeting = 'AtmController!';
    this.Bank = Bank;
    this.balance = Bank.getState();
    this.$timeout = $timeout;
    this.$state = $state;
  }

  withdraw(){
    if(this.withdrawAmount > this.balance){
      this.showError('You don\'t have enough in your account for that!');
      return;
    }

    this.Bank.withdraw(this.withdrawAmount)
      .then(() => {
        this.$state.go('casino');
      });
  }

  showError(e){
    this.showUserError = true;
    this.errorMessage = e || 'Nope';
    this.credits = {};
    this.$timeout(()=> {
      this.showUserError = false;
      this.errorMessage = '';
    }, 3000);
  }

};

AtmController.$inject = ['Auth', 'Bank', '$timeout', '$state'];

export {AtmController};
