//Todo List Items
let todos = [];

const todoJSON = localStorage.getItem("todos");

if (todoJSON !== null) {
  todos = JSON.parse(todoJSON);
} else {
  console.log(typeof JSON.parse(todoJSON));
  todos = [];
}

const saveTodos = (todos) => {
  const savedTodos = localStorage.setItem("todos", JSON.stringify(todos));
  return savedTodos;
};

// Render todos to the screen
const render = (todos) => {
  generateDOM(todos);
};

//delete to do
const deleteToDo = (id) => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === id;
  });

  todos.splice(todoIndex, 1);
};

// generate things to DOM
const generateDOM = (todos) => {
  const todosDiv = document.querySelector("#todos-div");
  todosDiv.innerHTML = "";
  todos.forEach((todo) => {
    //definitions
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const span = document.createElement("span");
    const removeButton = document.createElement("button");

    //content setup
    span.textContent = todo.text;
    removeButton.textContent = "X";
    checkbox.checked = todo.completed;

    //appendix
    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(removeButton);

    //event handlers
    removeButton.addEventListener("click", (e) => {
      deleteToDo(todo.id);
      saveTodos(todos);
      render(todos);
    });

    checkbox.addEventListener("change", (e) => {
      todo.completed = e.target.checked;

      saveTodos(todos);
      render(todos);
    });
    //final appendix
    todosDiv.appendChild(div);
  });
};

//add a new todo

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInput = e.target.elements.todoInput;
  if (todoInput.value !== "" && todoInput.value !== undefined) {
    todos.unshift({
      id: uuidv4(),
      text: todoInput.value,
      completed: false,
    });
  } else {
    alert("Enter a value..");
  }

  todoInput.value = "";
  saveTodos(todos);
  render(todos);
});

render(todos);
