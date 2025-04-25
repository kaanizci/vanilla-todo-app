const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const filterSelect = document.getElementById('filter');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let todos = getTodos();
let currentFilter = 'all';

updateTodoList();

// 🚀 Görev Ekleme
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  const date = todoDate.value;
  if (text) {
    todos.push({ text, completed: false, date });
    saveTodos();
    updateTodoList();
    todoInput.value = '';
    todoDate.value = '';
  }
});

// 🌗 Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️ Light Mode';
  } else {
    darkModeToggle.textContent = '🌙 Dark Mode';
  }
});

// 🎯 Filtreleme
filterSelect.addEventListener('change', function () {
  currentFilter = this.value;
  updateTodoList();
});

// ✅ Listeyi Güncelle
function updateTodoList() {
  todoList.innerHTML = '';
  let filteredTodos = todos;

  if (currentFilter === 'completed') {
    filteredTodos = todos.filter(t => t.completed);
  } else if (currentFilter === 'incomplete') {
    filteredTodos = todos.filter(t => !t.completed);
  }

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo';
    if (todo.completed) li.classList.add('completed');

    li.innerHTML = `
      <span>${todo.text} ${todo.date ? `📅 ${todo.date}` : ''}</span>
      <div>
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <button class="delete">🗑️</button>
      </div>
    `;

    // Tamamlandı checkbox
    li.querySelector('input').addEventListener('change', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      updateTodoList();
    });

    // Silme butonu
    li.querySelector('.delete').addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      updateTodoList();
    });

    todoList.appendChild(li);
  });
}

// 📦 Kaydetme
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 📤 Yükleme
function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}