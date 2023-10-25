document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");

    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Load tasks from local storage
    function loadTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Add a new task
    document.getElementById("addTask").addEventListener("click", () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
            taskInput.value = "";
        }
    });

    // Delete a task
    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete")) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        }
    });

    // Initial load of tasks
    loadTasks();
});
