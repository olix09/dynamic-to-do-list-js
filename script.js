// Wait for the HTML document to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't save again when loading
    }

    // Function to save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to get current tasks from Local Storage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If the function is called without taskText (from UI), get input value
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Check if the input is empty
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Assign onclick event to remove the task
        removeButton.onclick = () => {
            taskList.removeChild(li);

            // Remove task from Local Storage
            const tasks = getTasks().filter(task => task !== taskText);
            saveTasks(tasks);
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if needed
        if (save) {
            const tasks = getTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Add event listener for Add Task button click
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add event listener for Enter key press on the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
