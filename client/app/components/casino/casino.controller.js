class CasinoController {
  constructor(Auth, $interval, $timeout, $state){
    const User = Auth.getUser();
    this.Auth = Auth;
    this.$timeout = $timeout;
    this.$state = $state;
    this.greeting = 'CasinoController!';
    this.coins = User.pocketMoney;
    this.username = User.username;
    this.buttonText = this.coins ? 'Play' : 'Hit the ATM';
    this.spinning = false;


    this.reel1 = 0;
    this.reel2 = 0;
    this.reel3 = 0;
  }

  leverOrAtm(){
    if(this.coins){
      this.pullTheLever();
    }
    else{
      this.$state.go('atm');
    }
  }

  pullTheLever(){
    this.betAmount = this.betAmount || 1;

    if(this.coins - this.betAmount < 0){
      this.showAlert('You need to make a smaller bet!');
      return;
    }
    this.spinning = true;
    this.coins -= this.betAmount;

    this.Auth.updateUser({pocketMoney: this.coins})
    .then(() => {
      if(!this.coins){
        this.buttonText = 'Hit the ATM';
      }

      this.reel1 = Math.floor(Math.random()*10);
      this.reel2 = Math.floor(Math.random()*10);
      this.reel3 = Math.floor(Math.random()*10);

      if(this.reel1 !== this.reel2 && this.reel2 !== this.reel3){
        this.spinning = false;
        return;
      }

      let multipliers;

      if(this.reel1 === this.reel2 && this.reel2 === this.reel3){
        if(this.reel1 === 0){
          multipliers = [10, 10, 10];
        }
        else{
          multipliers = [this.reel1, this.reel2, this.reel3];
        }
      }
      if(this.reel1 === this.reel2 || this.reel2 === this.reel3){
        if(this.reel2 === 0){
          multipliers = [10, 10];
        }
        else{
          multipliers = [this.reel2, this.reel2];
        }
      }

      let winnings = multipliers.reduce((total, num) => {
        return total * num;
      }, this.betAmount);

      this.coins += winnings;

      this.Auth.updateUser({pocketMoney: this.coins})
      .then(() => {
        this.showAlert(`You WON ${winnings} coins!!`)
        this.spinning = false;
      });


    });
  }

  showAlert(e){
    this.showingAlert = true;
    this.alert = e || 'Nope';
    this.credits = {};
    this.$timeout(() => {
      this.showingAlert = false;
      this.alert = '';
    }, 3000);
  }

};

CasinoController.$inject = ['Auth', '$interval', '$timeout', '$state'];

export {CasinoController};
