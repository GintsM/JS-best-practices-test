import { JSDOM } from 'jsdom';
import Build from './ui.js';

const dom = new JSDOM(`<ul id="addList" class="flcol">`);// eslint-disable-line
global.document = dom.window.document;
global.window = dom.window;

const addList = document.getElementById('addList');
const elementToAdd = {
  task: 'Hello list',
  complete: false,
  index: 0,
};

Build.drawHtmlElement(elementToAdd, addList);

test('Add exactly one \'li\' element', () => {
  expect(addList.childElementCount).toBe(1);
});

Build.addTaskToLocalStore(elementToAdd);
describe('Test remove an add methods in Build class', () => {
  test('Add elements properties to LocalStorage', () => {
    expect((Build.getFromLocalStore())[0].complete).toBe(false);
  });
  test('Remove element from DOM and from LocalStorage', () => {
    const target = document.getElementById('0 trash');
    Build.removeTask(target, 0);
    expect(addList.childElementCount).toBe(0);
  });
  test('Remove element from DOM and from LocalStorage', () => {
    expect(Build.getFromLocalStore()).toBeDefined();
  });
});