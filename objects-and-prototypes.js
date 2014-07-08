// calling super object of function from current code
// * when prototype comes from  a constructor function *
Person = function(name){
  this.name = name;
}

Person.prototype.speak = function(msg){
  console.log(this.name + " says " + msg);
}

aimee = new Person(aimee);
aimee.speak = function(msg){
  // call parent function's speak message manually
  Person.prototyp.speak.call(this, msg);
}

aimee.speak("Hello there!"); // Hello there!

// calling super object of function from current code
// * when prototype is an object *
basePerson = {
  speak = function(msg){
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

ClassObjects.inherits = function(inherited, definition){
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
  };
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

ClassObjects.inherits = function(inherited, definition){
  var inheritedInstance = Object.create(inherited);
  ClassyObjects.copyTo(inheritedInstance, definition);
  var ClassConstructor = function(){
    this.super = inherited;
  };
  ClassConstructor.prototype = inheritedInstance;
  return ClassConstructor;
}

ClassyObjects.extend = function(definition){
  var prototype = this;
  if (typeof prototype === "function"){
    prototype = this.prototype
  }
  var Constructor = ClassyObject.inherits(prototype, definition);
  Constuctor.extend = this.extend;
  return Constructor;
}

ClassyObjects.define = function(definition){
  var classObj = {};
  classyObj.extend = ClassyObj.extend;
  return classyObj.extend(definition);
}

///// 1
myPrototype = {};
myPrototype.extend = ClassObjects.extend;

MyClass = myPrototype.extend({
  foo: "bar",
  baz: function(){
    console.log(this.foo);
  };
});

///// 2 - with ClassObjects.define definition
MyClass = ClassObjects.define({
  foo: "bar",
  baz: function(){
    console.log(this.foo);
  };
});

myObject = new MyClass();
myObject.baz(); // bar

MySubClass = MyClass.extend({
  myFunc: function(){
    console.log("a sub-class function");
  },
  baz: function(){
    console.log("sub-class baz");
  }
});

mySubObj = new MySubClass();
mySubObj.myFunc(); // a sub-class function
mySubObj.baz(); // bar (without setting this.super)
mySubObj.baz(); // sub-class baz (after setting this.super)
