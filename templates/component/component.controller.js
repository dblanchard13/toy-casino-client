class <%= upCaseName %>Controller {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.greeting = '<%= upCaseName %>Controller!';
    this.items = [
      {id: 1, name: 'David'},
      {id: 2, name: 'Jack'},
      {id: 3, name: 'Nick'}
    ];
    this.nextId = 4;
  }

  addItem(){
    if(!this.itemName){
      this.showAlert('Gotta enter an item name first!');
      return;
    }

    let item = {
      id: this.nextId ++,
      name: this.itemName
    };
    this.items.push(item);
    this.itemName = '';
  }

  removeItem(idx){
    this.items.splice(idx, 1);
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

<%= upCaseName %>Controller.$inject = ['$timeout'];

export {<%= upCaseName %>Controller};
