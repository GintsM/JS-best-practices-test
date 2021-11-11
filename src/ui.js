import Store from './store.js';

const Storage = new Store();

export default class Build {
  static getFromLocalStore() {
    let task;
    if (Storage.getItem('task')) {
      task = JSON.parse(Storage.getItem('task'));
    } else {
      task = [];
    }
    return task;
  }

  static addTaskToLocalStore(task) {
    const storeElement = Build.getFromLocalStore();
    storeElement.push(task);
    Storage.setItem('task', JSON.stringify(storeElement));
  }

  static addToLocalStore(arr) {
    Storage.setItem('task', JSON.stringify(arr));
  }

  static addToPage(place) {
    const arrayOfElements = Build.getFromLocalStore();
    arrayOfElements.forEach((elem) => Build.drawHtmlElement(elem, place));
    Build.addToLocalStore(arrayOfElements);
  }

  static removeTask(target, index) {
    const storedBooks = Build.getFromLocalStore();
    storedBooks.splice(index, 1);
    Build.organizeIndexLSt(storedBooks);
    Storage.setItem('task', JSON.stringify(storedBooks));
    target.parentElement.parentElement.parentElement.remove();
  }

  static removeCompletedTasks(target) {
    target.parentElement.parentElement.remove();
  }

  // Add HTML to a page. Parametrs - what to add and where to add
  static drawHtmlElement(element, place) {
    let checked = '';
    if (element.complete) {
      checked = 'checked';
    }
    const listElement = document.createElement('li');
    listElement.classList.add('flrow');
    listElement.innerHTML = `
      <div class="taskCheck">
        <input type="checkbox" class="hello" id="${element.index}" ${checked}>
        <label for="${element.index}">${element.task}</label>
        <textarea name="text" class="textarea hide" cols="30" rows="1" placeholder="${element.task}" maxlength="100"></textarea>
        <small class="hide"><i class="fas fa-check"></i></small>
      </div>
      <div>
        <div class="vdots"><i class="fas fa-ellipsis-v"></i></div>
        <span class="tras hide"><i class="far fa-trash-alt" id="${element.index} trash"></i></span>
      </div>`;
    place.appendChild(listElement);
  }

  static lastElementsIndex(parent) {
    if (parent.childElementCount > 0) {
      return parent.childElementCount + 1;
    }
    return 1;
  }

  static checkButtons() {
    const tryCheck = Array.from(document.getElementsByClassName('hello'));
    return tryCheck;
  }

  static editFromTextarea(text, index) {
    const tasks = Build.getFromLocalStore();
    tasks[index].task = text;
    Build.addToLocalStore(tasks);
  }

  static clearAllComplete() {
    const checkBoxes = Build.checkButtons();
    checkBoxes.forEach((box) => {
      if (box.checked) {
        Build.removeCompletedTasks(box);
      }
    });
    Build.orginizeID();
    const tasks = Build.getFromLocalStore();
    const tasksToDo = tasks.filter((task) => !task.complete);
    Build.organizeIndexLSt(tasksToDo);
    Build.addToLocalStore(tasksToDo);
  }

  static orginizeID() {
    const elements = Build.checkButtons();
    elements.forEach((elem, index) => elem.setAttribute('id', `${index + 1}`));
  }

  static organizeIndexLSt(arr) {
    arr.forEach((task, index) => {
      task.index = index + 1;
    });
    return arr;
  }

  static editTask(e) {
    const index = parseInt(e.srcElement.attributes.for.nodeValue, 10) - 1;
    const textarea = e.srcElement.nextElementSibling;
    const confirm = textarea.nextElementSibling;
    confirm.classList.remove('hide');
    textarea.classList.remove('hide');
    e.target.classList.add('hide');
    confirm.addEventListener('click', () => {
      if (textarea.value === '') {
        textarea.value = e.target.innerHTML;
      }
      Build.editFromTextarea(textarea.value, index);
      confirm.classList.add('hide');
      textarea.classList.add('hide');
      e.target.textContent = textarea.value;
      e.target.classList.remove('hide');
    });
  }

  static completeTaskLocal(e) {
    const toChange = Build.getFromLocalStore();
    const i = parseInt(e.id, 10) - 1;
    toChange[i].complete = e.checked;
    Build.addToLocalStore(toChange);
  }
}