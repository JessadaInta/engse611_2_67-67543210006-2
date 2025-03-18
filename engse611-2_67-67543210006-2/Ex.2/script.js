document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#todo-form");
  const todoInput = document.querySelector("#todo-input");
  const todoList = document.querySelector("#todo-list");
  const dropbtn = document.querySelector(".dropbtn");
  let selectedTaskType = "General"; 
  let todos = [];

  window.toggleDropdown = function() {
      document.getElementById("taskDropdown").classList.toggle("show");
  }


  window.setTaskType = function(type) {
      selectedTaskType = type;
      dropbtn.textContent = `Task Type: ${type}`;
      toggleDropdown(); 
  };


  function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText === "") {
          alert("Please enter a task!");
          return;
      }

      const todo = {
          id: Date.now(),
          text: todoText,
          category: selectedTaskType,
          completed: false
      };

      todos.push(todo);
      todoInput.value = "";
      renderTodo();
  }


  function deleteTodo(id) {
      if (confirm("Do you want to delete this task?")) {
          todos = todos.filter(todo => todo.id !== id);
          renderTodo();
      }
  }


  function toggleCompleted(id) {
      todos = todos.map(todo => {
          if (todo.id === id) {
              todo.completed = !todo.completed;
          }
          return todo;
      });
      renderTodo();
  }


  function renderTodo() {
      todoList.innerHTML = "";
      todos.forEach(todo => {
          const todoItem = document.createElement("li");
          const todoText = document.createElement("span");
          const todoCategory = document.createElement("small");
          const todoDeleteButton = document.createElement("button");

          todoText.textContent = todo.text;
          todoCategory.textContent = ` (${todo.category})`;
          todoDeleteButton.textContent = "Delete";


          if (todo.completed) {
              todoText.style.textDecoration = "line-through";
              todoText.style.color = "gray";
          }

          todoItem.addEventListener("click", () => toggleCompleted(todo.id));
          todoDeleteButton.addEventListener("click", (event) => {
              event.stopPropagation(); 
              deleteTodo(todo.id);
          });

          todoItem.appendChild(todoText);
          todoItem.appendChild(todoCategory);
          todoItem.appendChild(todoDeleteButton);
          todoList.appendChild(todoItem);
      });
  }

  form.addEventListener("submit", (event) => {
      event.preventDefault();
      addTodo();
  });

  window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
          const dropdowns = document.getElementsByClassName("dropdown-content");
          for (let i = 0; i < dropdowns.length; i++) {
              let openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
              }
          }
      }
  };

  renderTodo();
});
