//gasim elementul in pagina

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);
let tasks = [];
//important cum luam datele din local storage

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach( (task) => renderTask(task));
}

checkEmptyList();

function addTask(e) {
    e.preventDefault();

    //extragerea textului din input
    const taskText = taskInput.value;
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask);

    saveToLocaleStorage();

    renderTask(newTask);
    //curatim imputul si il selectam
    taskInput.value = "";
    taskInput.focus();

    //ascundem elementul "taskuri nu sunt"

    checkEmptyList();

}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');
    //gasim taskul dupa id
    const id = Number(parentNode.id);
    //const index = tasks.findIndex( (task)=> task.id === id);
    //steregem elementul din masiv
    //tasks.splice(index, 1);

    //stergem taskul prin filtrul masiv
    tasks = tasks.filter(function (task) {
        if (task.id === id) {
            return false;
        } else {
            return true;
        }
    });
    //steregem elementul din tabel
    saveToLocaleStorage();
    parentNode.remove();
    checkEmptyList();

}

function doneTask(event) {
    if (event.target.dataset.action !== "done") return;

    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);

    task.done = !task.done;

    saveToLocaleStorage();
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListEliment = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">Lista de tskuri este goala</div>
        </li> `;

        tasksList.insertAdjacentHTML('afterbegin', emptyListEliment);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }

}

function saveToLocaleStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    //creem css clasa pentru tag span
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    //creem sablonul pentru task nou
    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                     <span class="${cssClass}">${task.text}</span>
                     <div class="task-item__buttons">
                         <button type="button" data-action="done" class="btn-action">
                             <img src="./img/tick.svg" alt="Done" width="18" height="18">
                         </button>
                         <button type="button" data-action="delete" class="btn-action">
                             <img src="./img/cross.svg" alt="Done" width="18" height="18">
                         </button>
                     </div>
                 </li>`;
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

}




