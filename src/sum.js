function sum(a, b) {
  return a + b;
}

function stringLength(str) {
  if (str.length >= 1 && str.length <= 10) {
    return str.length;
  } else {
    throw 'empty, or too long';
  }
}

function reversedString(str) {
  return [...str].reverse().join('');
}

class Calc {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  add() {
    return this.a + this.b;
  }

  subtract() {
    return this.a - this.b;
  }

  divide() {
    return this.a / this.b;
  }

  multiply() {
    return this.a * this.b;
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export {
  sum, stringLength, reversedString, Calc, capitalize
};
