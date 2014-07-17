var doStuff = require("./do-stuff");
var myModule = {

  /*
  doStuff: function(){
    return "I'm doing something!";
  },
  */

  addThings: function(a, b){
    return a + b;
  },

  doStuff: doStuff

}

module.exports = myModule;
