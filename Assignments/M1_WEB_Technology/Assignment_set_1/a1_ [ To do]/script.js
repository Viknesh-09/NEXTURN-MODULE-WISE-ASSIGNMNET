document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() !== "") {
        addTaskToList(taskInput.value);
        saveTask(taskInput.value);
        taskInput.value = "";
        taskInput.focus();
    } else {
        alert("Please enter a task.");
    }
}

function addTaskToList(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task;
    li.className = "task-item list-group-item d-flex justify-content-between align-items-center";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "btn btn-danger btn-sm";
    removeButton.onclick = function() {
        taskList.removeChild(li);
        removeTaskFromStorage(task);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
