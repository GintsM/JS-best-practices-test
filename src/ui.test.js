/**
 * @jest-environment jsdom
 */

import Build from './ui.js';

const addList = document.createElement('ul');
const elementToAdd = {
  task: 'Hello list',
  complete: false,
  index: 0,
};
Build.addTaskToLocalStore(elementToAdd);

// test for Add function, Build.drawHtmlElement
test('Add exactly one \'li\' element', () => {
  Build.drawHtmlElement(elementToAdd, addList);
  expect(addList.childElementCount).toBe(1);
});

describe('Test remove an add methods in Build class', () => {
  test('Add elements properties to Local(mocked)Storage', () => {    
    expect((Build.getFromLocalStore())[0].complete).toBe(false);
  });
  test('Remove element from DOM and from Local(mocked)Storage', () => {
  });
});

