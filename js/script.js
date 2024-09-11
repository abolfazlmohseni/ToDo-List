let $ = document;
// Select ELement Html
const InuptElemtAddTasck = $.querySelector("#input_add-tasck");
const BtnElemtAddTasck = $.querySelector("#BtnSunmit");
let InputElementEditTasck = $.querySelector(".editor_tasck-box");

// Load tasks from localStorage
function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
    const tasks = loadTasks();
    const taskBox = $.querySelector(".tasck-box");
    taskBox.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed, task.id);
    });

    CountingTascks();
    CheckNumberItems();
}

// Add task to DOM
function addTaskToDOM(text, completed = false, id = Date.now()) {
    let ConteynerNewTasck = $.createElement("div");
    let TasckText = $.createElement("div");
    let Icon1 = $.createElement("i");
    let ContentTasck = $.createElement("p");
    let moreIconsConteyner = $.createElement("div");
    let Icon2 = $.createElement("i");
    let Icon3 = $.createElement("i");

    ConteynerNewTasck.classList = completed ? "tasck-items OK" : "tasck-items";
    TasckText.classList = "tasck-text";
    Icon1.classList = completed ? "bi bi-check2-square" : "bi bi-square";
    ContentTasck.classList = "tasck-content";
    moreIconsConteyner.classList = "right_icon-tasck";
    Icon2.classList = "bi bi-trash";
    Icon3.classList = "bi bi-pencil-square";

    ContentTasck.innerHTML = text;

    moreIconsConteyner.append(Icon2, Icon3);
    TasckText.append(Icon1, ContentTasck);
    ConteynerNewTasck.append(TasckText, moreIconsConteyner);

    const taskBox = $.querySelector(".tasck-box");
    taskBox.append(ConteynerNewTasck);

    // Add event listeners
    Icon2.addEventListener('click', function () {
        deleteTask(id);
    });
    Icon1.addEventListener('click', function () {
        toggleTaskCompletion(id);
    });
    Icon3.addEventListener('click', function () {
        editTask(id);
    });
}

// Add Task
BtnElemtAddTasck.addEventListener('click', function () {
    let text = InuptElemtAddTasck.value;
    if (text.trim()) {
        let tasks = loadTasks();
        const newTask = { id: Date.now(), text: text, completed: false };
        tasks.push(newTask);
        saveTasks(tasks);
        addTaskToDOM(newTask.text, newTask.completed, newTask.id);
        InuptElemtAddTasck.value = '';
    }
});
InuptElemtAddTasck.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        BtnElemtAddTasck.click();
    }
});

// Delete Task
function deleteTask(id) {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

// Toggle Task Completion
function toggleTaskCompletion(id) {
    let tasks = loadTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks(tasks);
    renderTasks();
}

// Edit Task
var Selectitemstasck = null;
function editTask(id) {
    let tasks = loadTasks();
    const taskToEdit = tasks.find(task => task.id === id);
    InputElementEditTasck.style.display = 'block';
    InputElementEditTasck.firstElementChild.value = taskToEdit.text;
    Selectitemstasck = id;
}

const BtnEditor = $.querySelector("#BtnEditor");
const BtnClese = $.querySelector("#BtnClese");

BtnEditor.addEventListener('click', function () {
    let tasks = loadTasks();
    tasks = tasks.map(task => {
        if (task.id === Selectitemstasck) {
            return { ...task, text: InputElementEditTasck.firstElementChild.value };
        }
        return task;
    });
    saveTasks(tasks);
    renderTasks();
    InputElementEditTasck.style.display = 'none';
    InputElementEditTasck.firstElementChild.value = '';
});
BtnClese.addEventListener('click', function () {
    InputElementEditTasck.style.display = 'none';
    InputElementEditTasck.firstElementChild.value = '';
});

// Counting Tasks
function CountingTascks() {
    let tasks = loadTasks();
    let completedTasks = tasks.filter(task => task.completed).length;
    let numbertasck = $.querySelector(".numbertasck");
    let numbertiktasck = $.querySelector(".numbertiktasck");
    let tasckNumberText = $.querySelector(".tasck-number-text");

    numbertiktasck.innerHTML = tasks.length;
    numbertasck.innerHTML = completedTasks;

    if (tasks.length === completedTasks) {
        tasckNumberText.innerHTML = "همه کارارو به راه کردی";
    } else {
        tasckNumberText.innerHTML = "!هنوز کارات مونده";
    }
}

// Text For Task container
function CheckNumberItems() {
    let tasks = loadTasks();
    let close = $.querySelector("#close");

    if (tasks.length === 0) {
        close.style.display = 'block';
        close.style.color = '#fff';
    } else {
        close.style.display = 'none';
    }
}

// Render tasks on page load
renderTasks();