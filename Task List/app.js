// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");

// Define Functions

// Get tasks from LS
function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement("li");
		// Add class
		li.className = "collection-item";
		// Create Text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create link element
		const link = document.createElement("a");
		// Add class
		link.className = "delete-item";
		// Add icon html
		link.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
		// Append link to li
		li.appendChild(link);
		// Append li to TaskList
		taskList.appendChild(li);
	});
}

// Add Task

function addTask(e) {
	e.preventDefault();

	// Validation
	if (!taskInput.value) {
		alert("Add a task");
	}

	// Create li element
	const li = document.createElement("li");
	// Add class
	li.className = "collection-item";
	// Create Text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create link element
	const link = document.createElement("a");
	// Add class
	link.className = "delete-item";
	// Add icon html
	link.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
	// Append link to li
	li.appendChild(link);
	// Append li to TaskList
	taskList.appendChild(li);

	// Store in LS
	storeTaskInLocalStorage(taskInput.value);

	taskInput.value = "";
}

function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();
		}
	}

	removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear Tasks
function clearTask() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearTasksFromLocalStorage();
}

// Clear from LS
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

function filterTask(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent.toLowerCase();

		if (item.indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}

// Add event listeners
// DOM Loaded
document.addEventListener("DOMContentLoaded", getTasks);
// Add Task
form.addEventListener("submit", addTask);

// Remove Task
taskList.addEventListener("click", removeTask);

// Clear Tasks
clearBtn.addEventListener("click", clearTask);

// Filter task
filter.addEventListener("keyup", filterTask);
