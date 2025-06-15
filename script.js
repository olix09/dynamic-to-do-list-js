document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: do not save again when loading
    }

    // Add task to the list and optionally save to Local Storage
    function addTask(taskText, save = true) {
        // Ignore empty input
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        // Create li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task both from DOM and Local Storage on click
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        // Append button to li, li to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field if this was a new task from input
        if (save) {
            taskInput.value = '';
            updateLocalStorage();
        }
    }

    // Update Local Storage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        // Loop through all li elements and collect task texts (exclude the 'Remove' button text)
        taskList.querySelectorAll('li').forEach(li => {
            // li.textContent includes button text, so remove it by taking only the text node
            const taskText = li.firstChild.textContent || li.textContent.replace('Remove', '').trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners for adding tasks
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Initial load
    loadTasks();
});
