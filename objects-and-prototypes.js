// calling super object of function from current code
// * when prototype comes from  a constructor function *
Person = function(name){
  this.name = name;
}

Person.prototype.speak = function(msg){
  console.log(this.name + " says " + msg);
}

aimee = new Person('aimee');
aimee.speak = function(msg){
  // call parent function's speak message manually
  Person.prototype.speak.call(this, msg);
}

aimee.speak("Hello there!"); // Hello there!

// calling super object of function from current code
// * when prototype is an object *
basePerson = {
  speak: function(msg){
    console.log(this.name + " says " + msg);
  }
}

Person = function(name){
  this.name = name;
}

Person.prototype = basePerson;

aimee = new Person(aimee);
aimee.speak = function(msg){
  // call parent function's speak message manually
  basePerson.speak.call(this, msg);
}

aimee.speak("Hello there!"); // Hello there!

///// Classy Inheritance /////
if  (!Object.create || !typeof Object.create === "function" ){
  Object.create = function(obj){
    var F = function(){};
    F.prototype = obj;
    return new F();
  }
}

// Framework Namespace
ClassyObjects = {};

ClassyObjects.copyTo = function(target, source){
  for(var attr in source){
    target[attr] = source[attr];
  }
}

ClassyObjects.inherits = function(inherited, definition){
  var inheritedInstance = Object.create(inherited);
  ClassyObjects.copyTo(inheritedInstance, definition);
  var ClassConstructor = function(){};
  ClassConstructor.prototype = inheritedInstance;
  return ClassConstructor;
}

myPrototype = {};

MyClass = ClassyObjects.inherits(myPrototype, {
  foo: "bar",
  baz: function(){
    console.log(this.foo);
  }
});

myObject = new MyClass();
myObject.baz(); // bar

//////////////////////////////
///// Classy Inheritance /////
if  (!Object.create || !typeof Object.create === "function" ){
  Object.create = function(obj){
    var F = function(){};
    F.prototype = obj;
    return new F();
  }
}

// Framework Namespace Improvement with extend
ClassyObjects = {};

ClassyObjects.copyTo = function(target, source){
  for(var attr in source){
    target[attr] = source[attr];
  }
}

ClassyObjects.inherits = function(inherited, definition){
  // create subclass
  // the inherited instance becomes the prototype for the new class
  var inheritedInstance = Object.create(inherited);
  // copy the new instance properties to the object passed in
  ClassyObjects.copyTo(inheritedInstance, definition);
  // create the constructor function for the new class
  var ClassConstructor = function(){
    // set this.super to the parent object
    this.super = inherited;
  };
  ClassConstructor.prototype = inheritedInstance;
  // returns ClassConstructor with prototype set to the subclass created above
  return ClassConstructor;
}

ClassyObjects.extend = function(definition){
  var prototype = this; // set the prototype if we're inheriting from a plain object
  if (typeof prototype === "function"){ // set the prototype if we're inheriting from a constructor function
    prototype = this.prototype
  }
  var Constructor = ClassyObjects.inherits(prototype, definition);
  Constructor.extend = this.extend;
  return Constructor;
}

// attach the extend function to an empty object literal
ClassyObjects.define = function(definition){
  var classyObj = {};
  classyObj.extend = ClassyObjects.extend;
  return classyObj.extend(definition);
}

///// 1
myPrototype = {};
myPrototype.extend = ClassyObjects.extend; // must define 'extend' by setting it equal to framework's extend

MyClass = myPrototype.extend({
  foo: "bar",
  baz: function(){
    console.log(this.foo);
  }
});

///// 2 - with ClassObjects.define definition
MyClass = ClassyObjects.define({
  foo: "bar",
  baz: function(){
    console.log(this.foo);
  }
});

///// 1 or 2 results
myObject = new MyClass();
myObject.baz(); // bar

MySubClass = MyClass.extend({
  myFunc: function(){
    console.log("a sub-class function");
  },
  baz: function(){
    console.log("sub-class baz");
  },
  superbaz: function(){
    this.super.baz();
  }
});

mySubObj = new MySubClass();
mySubObj.myFunc(); // a sub-class function
mySubObj.baz(); // bar (without setting this.super)

///// After setting this.super
mySubObj.baz(); // sub-class baz
mySubObj.superbaz(); // bar
