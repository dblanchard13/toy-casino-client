class RulesController {
  constructor() {
    this.greeting = 'The Rules are simple:';

    this.rules = [
      'Consecutive numbers are multiplied by themselves and the amount of your bet',
      '0 counts as 10',
      'Example spin: 0-0-1 with a bet of 5 will return winnings of 10*10*5 = 100 coins'
    ];
  }
};

RulesController.$inject = [];

export {RulesController};
