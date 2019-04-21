// membuat variabel budget

var budgetController = (function() {

  // membuat function constructor pemasukan dan pengeluaran
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    }
  };

  //menambahkan item ke dalam budget controller
  return {
    addItem: function(type, des, val) {
     var newItem, ID;

    //  membuat ID baru
    if (data.allItems[type].length > 0) {
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }
    
    //membuat item baru berdasarkan inc atau exp
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
       newItem = new Income(ID, des, val);
      }
     
      //memasukan kedalam struktur data
      data.allItems[type].push(newItem);
      //return element baru
      return newItem;
    }
  };

})();

// membuat variabel UI controler diisi dengan IIFE
var UIController = (function() {
  // read data input

  var DOMstring = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstring.inputType).value, //akan jadi inc atau exp 
        description: document.querySelector(DOMstring.inputDescription).value,
        value: document.querySelector(DOMstring.inputValue).value
      };
    },

    getDOMString: function() {
      return DOMstring;
    }

  };
})();

// membuat var controller untuk mengontrol budget dan UI
var controller = (function (budgetController, UIController) {

  var SetUpEventListeners = function() {
    var DOM = UIController.getDOMString();
    document.querySelector(DOM.inputBtn).addEventListener('click', addItem);

    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        addItem();
      }
    });
  };

  
  var addItem = function() {
  //  setelah tombol ditekan maka akan menghasilkan
    var input, newItem;
  // 1. mendapatkan data input
    input = UIController.getinput();
    
  // 2. menambahkan item ke dalam budget controller
    newItem = budgetController.addItem(input.type, input.description, input.value);
  // 3. menambahkan item ke dalam UI controller
  // 4. menghitung budget
  // 5. menampilkan hasil budget
    
  };

  return {
    init: function() {
      SetUpEventListeners();
    }
  };


})(budgetController, UIController);
controller.init();