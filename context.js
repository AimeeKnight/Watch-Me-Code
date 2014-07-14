// invokation of function changes, so the context of 'this' changes
foo = {
  bar: function(){
    console.log(this);
  },

  baz: function(callback){
    callback();
  }
}
foo.bar(); //Object
foo.baz(foo.bar); //DOMWindow

// context 1
function foo(){
  var bar = "baz";
  this.quux = function(){
    console.log(bar);
  }
  this.quux();
}

foo(); // baz
quux(); // baz

// context 2
// scope 1 = context
function foo(){
  var bar = "baz";
  this.quux = function(){
    console.log(bar);
  }
  this.quux();
}

f = new foo(); // baz
f.quux(); // baz

// Default Global Context
console.log(this); //DOMWindow in browser

// Function Context - invocation 1
function foo(){
  console.log(this);
}
console.log(this); // DOMWindow
foo(); //DOMWindow

//
function foo(){
  function bar(){
    console.log(this);
  }
  bar();
}
console.log(this); // DOMWindow
foo(); //DOMWindow

// Method context - invocation 2
foo = {
  bar: function(){
    console.log(this);
    console.log(this.baz);
  },
  baz: "quux"
}

foo.bar(); // Object, quux

// dot notation sets the context
// this is tied to the object the method is called on,
// not the object that the method is defined on.
foo = {
  bar: function(){
    console.log(this);
    var output = this.baz();
    console.log(output);
  },
  baz: function(){
    return "quux";
  }
}

foo.bar(); // Object, quux

var func = foo.bar; // foo.bar is a pointer to a function
func(); // produces error because 'this' is now set to the DOMWindow
// and the DOMWindow doesn't have a method 'baz'

// .call context - invocation 3
// exists on every function object
foo = {
  bar: function(a, b, c){
    console.log(this);
    console.log(a);
    console.log(b);
    console.log(c);
  }
}

function baz(){
}

foo.bar.call(); // DOMWindow
foo.bar.call(this); // DOMWindow
foo.bar.call(undefined); // DOMWindow
foo.bar.call(foo); // Object
foo.bar.call(baz); // Object
foo.bar.call(foo, 1, 2, 3); // Object, 1, 2, 3

// .apply - invocation 4
foo.bar.call(foo, [1, 2, 3]); // Object, 1, 2, 3

// Constructor function - invocation 5
function Foo(){
  console.log(this); // Foo

  this.bar = function(){
    console.log(this);
    console.log(this.baz);
  }
  this.baz = "quux";
}

f = new Foo(); // produces a new object with a prototype of Foo
f.bar(); // Foo, quux

// Constructor function - invocation 5
function Foo(){
  console.log(this); // Foo

  this.bar = function(){
    console.log(this);
    console.log(this.baz);
  }
  this.baz = "quux";
}

obj = {};
f = Foo.apply(obj);
obj.bar(); // Object, quux
f.bar(); // Exception - cannot call method 'bar' of undefined
// since not using the 'new' keyword
// Foo.apply doesn't return a value to f

function Foo(){
  console.log(this);

  this.bar = function(){
    console.log(this.baz);
  }
}

obj = {
  baz: "quux"
};

Foo.apply(obj); // Object
obj.bar(); // quux

f = new Foo(); // Foo
f.bar(); // undefined - since f doesn't define baz

// Callbacks - invocation of callback sets the context
function foo(callback){
  callback();
}

// A
foo(function(){
  console.log(this); //DOMWindow
});

// B
foo = {
  bar: function(callback){
    callback();
  });
}

// C
baz = {
  quux: function(){
    console.log(this);
  }
}

// A, B
foo.bar(function(){
  console.log(this); //DOMWindow
});

// C
foo.bar(baz.quux); //DOMWindow

var func = baz.quux;
foo.bar(func); //DOMWindow

//////////
foo = {
  bar: function(callback){
    callback.call(foo); // Object
  });
}

baz = {
  quux: function(){
    console.log(this);
  }
}

foo.bar(baz.quux);

var func = baz.quux;
foo.bar(func);

//////////
foo = {

  var myContext = {
    some: "object context that I want";
  }

  bar: function(callback){
    callback.call(myContext); // Object
  });
}

baz = {
  quux: function(){
    console.log(this);
  }
}

foo.bar(baz.quux);

var func = baz.quux;
foo.bar(func);

//////////
foo = {
  bar: function(callback){
    this.method = callback;
    this.method();
  }
}

baz = {
  quux: function(){
    console.log(this);
  }
}

var func = baz.quux;
foo.bar(func); // Object (Foo)

// creating a closure around your context
foo = {
  bar: function(callback){
    callback();
  }
}

baz = {
  quux: function(){
    var that = this;
    foo.bar(function(){
      console.log(this); // DOMWindow
      console.log(that); // Object
      console.log(that.some); // value
    });
  },
  some: "value"
}

baz.quux();

// Bound Context

foo = {
  bar: function(callback){
    callback();
  }
}

baz = {
  quux: function(){
    console.log(this); // DOMWindow
    console.log(this.some); // undefined
  },

  some: "value"
}

baz.quux(baz.quux);

// Bound Context Fix

foo = {
  bar: function(callback){
    callback.call(foo, 1, 2, 3);
  }
}

baz = {
  quux: function(a, b, c){
    console.log(this); // Object
    console.log(this.some); // value
    console.log(a); // 1
    console.log(b); // 2
    console.log(c); // 3
  },

  some: "value"
}

function bind(func, context){
  return function(){
    var args = Array.prototype.slice.call(arguments);
    return func.apply(context, args);
  }
}

var boundFunc = bind(baz.quux, baz)

baz.quux(boundFunc); // Object - baz

//Note: underscore's 'extend' method works like a mixin in Ruby
//extend will clobber original attributes and methods
//extend will also share methods and attributes between objects
//being extended

foo = {
  bar: function(){
    console.log(this);
  }
}

quux = {}

_.extend(quux, foo);
quux.bar(); // Object
