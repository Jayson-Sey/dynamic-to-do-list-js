document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false);
        });
    }

    function addTask(taskText, save = true) {
        const actualTaskText = typeof taskText === 'string' ? taskText : taskInput.value.trim();
        
        if (actualTaskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        const listItem = document.createElement('li');
        listItem.textContent = actualTaskText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            
            updateLocalStorageAfterRemoval(actualTaskText);
        };
        
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(actualTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
        
        if (typeof taskText !== 'string') {
            taskInput.value = '';
        }
    }

    function updateLocalStorageAfterRemoval(taskToRemove) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    addButton.addEventListener('click', function() {
        addTask(undefined, true);
    });
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(undefined, true);
        }
    });

    loadTasks();
});