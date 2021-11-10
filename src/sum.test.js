import { sum, stringLength, reversedString, Calc, capitalize } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('string length', () => {
  expect(stringLength('hello')).toBe(5);
});

test('string too long or short', () => {
  expect(() => { stringLength('elevencharseeee'); }).toThrow('empty, or too long');
});

test('reversed string', () => {
  expect(reversedString('reversed')).toBe('desrever');
});

describe('calculator functions', () => {
  test('add and multiply', () => {
    const add = new Calc(5, 6);
    const str = new Calc('one', 2);
    expect(add).toBeInstanceOf(Calc);
    expect(add.add()).toBe(11);
    expect(add.multiply()).toEqual(30);
    expect(add).toHaveProperty('b', 6);
    expect(str.multiply()).toBeNaN();
  });

  test('Substract and divide', () => {
    const subDiv = new Calc(36, 6);
    expect(subDiv.subtract()).toBe(30);
    expect(subDiv.divide()).toBe(6);
    expect(subDiv).toHaveProperty('b', 6);
    expect(subDiv.divide()).toBeLessThan(7);
  });
});

test('Capitalize first letter', () => {
  const word = 'hello';
  expect(capitalize(word)).toBe('Hello');
});