const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterSelect = document.getElementById("filter");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// ✅ DARK MODE
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ✅ FORM SUBMIT
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text !== "") {
    todos.push({ text, completed: false });
    todoInput.value = "";
    saveAndRender();
  }
});

// ✅ DELETE TODO
function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

// ✅ TOGGLE COMPLETE
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

// ✅ RENDER TODOS
function renderTodos() {
  todoList.innerHTML = "";

  let filtered = todos;
  if (currentFilter === "completed") {
    filtered = todos.filter((t) => t.completed);
  } else if (currentFilter === "incomplete") {
    filtered = todos.filter((t) => !t.completed);
  }

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo" + (todo.completed ? " completed" : "");
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleTodo(${index})">${todo.completed ? "✔️" : "✅"}</button>
        <button onclick="deleteTodo(${index})">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// ✅ FILTER CHANGE
filterSelect.addEventListener("change", (e) => {
  currentFilter = e.target.value;
  renderTodos();
});

// ✅ SAVE + RENDER
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// ✅ INITIAL LOAD
renderTodos();