// 1. تحديد العناصر من DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. دالة عرض المهام في الصفحة
function renderTasks() {
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    todoList.innerHTML = '<li class="empty-state">لا يوجد مهام حالياً </li>';
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `todo-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
          <div class="todo-item-content" onclick="toggleTask(${task.id})">
            <input type="checkbox" ${task.completed ? "checked" : ""} onclick="event.stopPropagation(); toggleTask(${task.id})">
            <span class="todo-text">${escapeHtml(task.text)}</span>
          </div>
          <button class="btn-delete" onclick="deleteTask(${task.id})" title="حذف المهمة">🗑️</button>
        `;

    todoList.appendChild(li);
  });
}

// 5. إضافة مهمة جديدة
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();

  if (!text) return;

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  todoInput.value = "";
});

// 6. تغيير حالة المهمة (مكتملة / غير مكتملة)
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  saveTasks();
  renderTasks();
}

// 7. حذف مهمة
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m];
  });
}

renderTasks();
