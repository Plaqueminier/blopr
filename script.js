let counter = 0;
let tasks = [];

function updateCounter() {
    document.getElementById('counter').textContent = counter;
}

function increment() {
    counter++;
    updateCounter();
    saveToLocalStorage();
}

function decrement() {
    counter--;
    updateCounter();
    saveToLocalStorage();
}

function reset() {
    counter = 0;
    updateCounter();
    saveToLocalStorage();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
    saveToLocalStorage();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    saveToLocalStorage();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function handleTaskInput(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('bloprData', JSON.stringify({
        counter: counter,
        tasks: tasks
    }));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('bloprData');
    if (saved) {
        const data = JSON.parse(saved);
        counter = data.counter || 0;
        tasks = data.tasks || [];
        updateCounter();
        renderTasks();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
});

console.log('Blopr app loaded successfully!');