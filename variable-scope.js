// WATCH ME CODE - Variable Scope

function sayFoo(){
  if (true){
    var foo = "hoiseted variable";
  }
  console.log(foo); // hoisted variable
}

function sayFoo(){
  if (false){
    var foo = "hoiseted variable";
  }
  console.log(foo); // undefined - declared but unasigned variable
}

function sayFoo(){
  if (true){
    //var foo = "hoiseted variable";
  }
  console.log(foo); // referenceError - variable doesn't exist
}

sayFoo();

// Closure - sayFoo has a closure around Foo
function outerScope(){
  var foo;

  function sayFoo(){
    if (true){
      foo = "hoiseted variable";
    }
    console.log(foo); // hoisted variable
  }

  sayFoo();
  console.log(foo); // hoisted variable
}
outerScope();
console.log(foo); // referenceError - variable doesn't exist

// immediately executing function - basis for module
// no asignment of function to a name or variable
// it can't be called by name because it's already immediately executed
(function(){
  var foo;

  function sayFoo(){
    if (true){
      foo = "hoiseted variable";
    }
    console.log(foo); // hoisted variable
  }

  sayFoo();
  console.log(foo); // hoisted variable
})();

// Private Scope - returning a value from a module
var outerFoo = (function(){
  var foo;

  function defineFoo(){

    if (true){
      foo = {
        key: "value",
        bar: function(){
          console.log("from bar");
        }
      };
    }

  }

  defineFoo();

  return foo;
})();

console.log(outerFoo.key); // value
outerFoo.bar(); // from bar

// defineFoo has a closure around count
// object literal also has a closure around the count variable
// can call methods on the foo object that in turn manipulate the private
// state of the count variable in the module
var outerFoo = (function(){
  var foo;
  var count = 0;

  function defineFoo(){

    if (true){
      foo = {
        key: "value",
        bar: function(){
          count += 1;
          return count;
        }
      };
    }

  }

  defineFoo();

  return foo;
})();

console.log(outerFoo.key); // value
console.log(outerFoo.bar()); // 1
console.log(outerFoo.bar()); // 2
console.log(outerFoo.bar()); // 3
console.log(outerFoo.bar()); // 4

// passing values to modules for performance
var myModule = (function($){
  console.log($); // jquery
})(jQuery);

// current scope = global
// exporting from a module
var myModule = (function($, _, global){
  console.log($); // jquery
  console.log(_); // underscore
  console.log(global); // DOMWindow would be different in Node, etc.

  global.foo = "a globally available variable, exported from the module";
})(jQuery, _, this);

console.log(this.foo);// a globally available variable, exported from the module
console.log(window.foo);// a globally available variable, exported from the module
console.log(foo);// a globally available variable, exported from the module

// new myFunction == a new object instance
// every function can be used as a constructor function

MyObject = function(){
  this.key = "value";
  this.doSomething = function(){
    console.log("I'm doing something");
  }
}

var myObject = new MyObject();
console.log(myObject.key); // value
myObject.doSomething(); // I'm doing something

// functionality the same - organized into a module
// private shared variable between object instances
MyObject = (function(){
  var privateVar = "I'm doing something privately";

  var myObj = function(){
    this.key = "value";
    this.doSomething = function(){
      console.log(privateVar);
    }
  };

  return myObj;
})();

var myObject = new MyObject();
var myObject2 = new MyObject();

console.log(myObject.key); // value
myObject.doSomething(); // I'm doing something
myObject2.doSomething(); // I'm doing something

// this function is immediatly invoked, so can only run once
// this means privateVar is only declared once
// everytime we create a new instance it still carry the closure around
// privateVar
// each instance shares the same copy of privateVar
MyObject = (function(){
  var privateVar2 = 0;

  var myObj = function(){
    this.key = "value";
    this.doSomething = function(){
      privateVar += 1;
      return privateVar;
    }
  };

  return myObj;
})();

var myObject = new MyObject();
var myObject2 = new MyObject();

console.log(myObject.key); // value

console.log(myObject.doSomething()); // 1
console.log(myObject.doSomething()); // 2
console.log(myObject.doSomething()); // 3

console.log(myObject2.doSomething()); // 4
console.log(myObject2.doSomething()); // 5
console.log(myObject2.doSomething()); // 6

// each instance defines it's own locally scoped variable for privateVar
MyObject = (function(){

  var myObj = function(){
    var privateVar2 = 0;
    this.key = "value";
    this.doSomething = function(){
      privateVar += 1;
      return privateVar;
    }
  };

  return myObj;
})();

var myObject = new MyObject();
var myObject2 = new MyObject();

console.log(myObject.key); // value

console.log(myObject.doSomething()); // 1
console.log(myObject.doSomething()); // 2
console.log(myObject.doSomething()); // 3

console.log(myObject2.doSomething()); // 1
console.log(myObject2.doSomething()); // 2
console.log(myObject2.doSomething()); // 3
