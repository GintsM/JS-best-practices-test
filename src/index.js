import './style.css';
import Tasks from './tasks';
import Build from './ui';

const build = new Build();
const addList = document.getElementById('addList');
build.addToPage(addList);

const addTask = document.getElementById('move');
addTask.addEventListener('click', () => {
  const taskToAdd = document.getElementById('addTask');
  const newTask = new Tasks(
    taskToAdd.value,
    false,
    Build.lastElementsIndex(addList),
  );
  Build.drawHtmlElement(newTask, addList);
  Build.addTaskToLocalStore(newTask);
  taskToAdd.value = '';
});

addList.addEventListener('click', (e) => {
  if (e.target.hasAttribute('for')) {
    Build.editTask(e);
  } else if (e.target.className === 'hello') {
    Build.completeTaskLocal(e);
  } else if (e.target.parentNode.className === 'vdots') {
    const hidenTrash = e.target.parentNode.nextElementSibling;
    e.target.parentNode.classList.add('hide');
    hidenTrash.classList.remove('hide');
  } else if (e.target.parentNode.className === 'tras') {
    const index = parseInt(e.target.id, 10) - 1;
    Build.removeTask(e.target, index);
  }
});

const clearDone = document.querySelector('body > div:nth-child(4) > h4');
clearDone.addEventListener('click', () => {
  Build.clearAllComplete();
});
