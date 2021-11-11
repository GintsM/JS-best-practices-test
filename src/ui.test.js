import { JSDOM } from 'jsdom';
import Build from './ui';

const dom = new JSDOM(`<!DOCTYPE html><body><ul id="addList" class="flcol"></body>`);// eslint-disable-line

global.document = dom.window.document;
global.window = dom.window;

const addList = document.getElementById('addList');
const elementToAdd = {
  task: 'Hello list',
  complete: false,
  index: 1,
};

Build.drawHtmlElement(elementToAdd, addList);

test("Add exactly one 'li' element", () => {
  expect(addList.childElementCount).toBe(1);
});

Build.addTaskToLocalStore(elementToAdd);
describe('Test remove an add methods in Build class', () => {
  test('Add elements properties to LocalStorage', () => {
    expect(Build.getFromLocalStore()[0].task).toBe('Hello list');
  });
  test('Remove element from DOM and from LocalStorage', () => {
    const target = document.getElementById('1 trash');
    const childcount = addList.childElementCount;
    Build.removeTask(target, 0);
    expect(addList.childElementCount).toBeLessThan(childcount);
  });
  test('Remove element from DOM and from LocalStorage', () => {
    expect(Build.getFromLocalStore()).toBeDefined();
  });
  
const textarea = document.querySelector('textarea');
describe('Edit function', () => {
  test('edit task with click event call', () => {
    Build.drawHtmlElement(elementToAdd, addList);
    expect(textarea.className).toBe('textarea hide');
    const editTarget = document.querySelector('label');
    const clickConfirm = document.querySelector('i');
    textarea.value = 'helllo';
    editTarget.click((e) => {
      Build.editTask(e);
      clickConfirm.click();
      expect(editTarget.innerText).toBe('helllo');
    });
  });
  test('complete status update', () => {
    Build.drawHtmlElement(elementToAdd, addList);
    Build.addTaskToLocalStore(elementToAdd);
    const checkbox = document.querySelector('input');
    checkbox.checked = true;
    Build.completeTaskLocal(checkbox);
    expect((Build.getFromLocalStore())[0].complete).toBe(true);
  });
  test('clear all completed tasks', () => {
    Build.drawHtmlElement(elementToAdd, addList);
    Build.addTaskToLocalStore(elementToAdd);
    const checkbox = document.querySelector('input');
    checkbox.checked = true;
    Build.completeTaskLocal(checkbox);
    const childcount = addList.childElementCount;
    Build.clearAllComplete();
    expect(addList.childElementCount).toBeLessThan(childcount);
  });
});