// Run script after the full HTML document has loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements: Add button, task input field, and task list container
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get the trimmed value from the task input field
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert('Please enter a task.');
            return; // Exit the function early if no input
        }

        // Create a new list item element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for this task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When the remove button is clicked, remove the task from the list
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the new task (list item) to the task list
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = '';
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding task by pressing Enter key inside the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
