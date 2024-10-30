document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //Populate task list with saved tasks
  savedTasks.forEach((taskText) => {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
  });
}

function toogleComplete(taskTextElement) {
  taskTextElement.classList.toggle("completed");
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;
  const taskList = document.getElementById("taskList");

  const taskItem = createTaskElement(taskText);

  taskList.appendChild(taskItem);
  saveTasks();
  taskInput.value = "";
}

function createTaskElement(taskText) {
  const taskItem = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const taskTextElement = document.createElement("span");

  taskTextElement.textContent = taskText;

  checkbox.onclick = () => {
    toogleComplete(taskTextElement);
  };
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = () => {
    const editText = prompt("Edit Your Task", taskTextElement.textContent);
    if (editText !== null && editText.trim() !== "") {
      taskTextElement.textContent = editText.trim();
      saveTasks();
    }
  };

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    taskItem.remove();
    saveTasks();
  };
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll("#taskList li")).map(
    (taskItem) => taskItem.firstChild.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
