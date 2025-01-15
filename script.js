const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority");
const searchBox = document.getElementById("search-box");

// Add a new task
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Please enter a task.");
        return;
    }

    // Create task element
    const li = document.createElement("li");
    li.innerHTML = `
        ${inputBox.value}
        <span class="priority ${prioritySelect.value}">${prioritySelect.value}</span>
        <span onclick="deleteTask(this)">×</span>
    `;
    li.addEventListener("click", () => li.classList.toggle("checked"));
    listContainer.appendChild(li);

    inputBox.value = '';
    saveTasks();
}

// Delete a task
function deleteTask(element) {
    element.parentElement.remove();
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from localStorage
function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || '';
    Array.from(listContainer.children).forEach(li => {
        li.addEventListener("click", () => li.classList.toggle("checked"));
    });
}

// Filter tasks based on search input
searchBox.addEventListener("input", () => {
    const filter = searchBox.value.toLowerCase();
    Array.from(listContainer.children).forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(filter) ? '' : 'none';
    });
});

// Initial load
loadTasks();
