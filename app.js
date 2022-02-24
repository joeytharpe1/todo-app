//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos); //getTodos grabs todos from localStorage
todoButton.addEventListener("click", addTodo); //addTodo is the function with the add todo logic
todoList.addEventListener("click", deleteCheck); //deleteCheck is the function with the delete todo logic
filterOptions.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();

  //Create Todo Div
  const todoDiv = document.createElement("div"); //create a div element
  todoDiv.classList.add("todo");

  //Create Li
  const newTodo = document.createElement("li"); //create a Li element
  newTodo.innerText = todoInput.value; //the Li text
  newTodo.classList.add("todo-item"); //add a class to li
  todoDiv.appendChild(newTodo); //putting li inside of the todo Div

  //Add todo to local storage
  saveLocalTodos(todoInput.value);

  //Check Mark button
  const completedButton = document.createElement("button"); //create a button for complete
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn"); //add class to complete button
  todoDiv.appendChild(completedButton); //add button to todo div element

  //Check trash button
  const trashButton = document.createElement("button"); //create a button for complete
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn"); //add class to complete button
  todoDiv.appendChild(trashButton); //add button to todo div element

  //Append the created div element to List in html with class of todo-list
  todoList.appendChild(todoDiv);

  //Clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  //grab item clicked on todo list
  const item = e.target;

  //Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall"); //add classname to be used in css animation on delete
    removeLocalTodos(todo); //remove todo item in local storage
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //checkmark todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

//to save to local storage
function saveLocalTodos(todo) {
  //check if things are in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    //check if a todo item exist
    todos = []; //if doesnt exist create empty array
  } else {
    //if we do have a array of todo items
    todos = JSON.parse(localStorage.getItem("todos")); //parse back the item into array
  }

  todos.push(todo); //push item from parameters into todo array
  localStorage.setItem("todos", JSON.stringify(todos)); //push back to local storage
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    //check if a todo item exist
    todos = []; //if doesnt exist create empty array
  } else {
    //if we do have a array of todo items
    todos = JSON.parse(localStorage.getItem("todos")); //parse back the item into array
  }

  todos.forEach(function (todo) {
    //Create Todo Div
    const todoDiv = document.createElement("div"); //create a div element
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li"); //create a Li element
    newTodo.innerText = todo; //the todo value from localstorage
    newTodo.classList.add("todo-item"); //add a class to li
    todoDiv.appendChild(newTodo); //putting li inside of the todo Div

    //Check Mark button
    const completedButton = document.createElement("button"); //create a button for complete
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn"); //add class to complete button
    todoDiv.appendChild(completedButton); //add button to todo div element

    //Check trash button
    const trashButton = document.createElement("button"); //create a button for complete
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn"); //add class to complete button
    todoDiv.appendChild(trashButton); //add button to todo div element

    //Append the created div element to List in html with class of todo-list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    //check if a todo item exist
    todos = []; //if doesnt exist create empty array
  } else {
    //if we do have a array of todo items
    todos = JSON.parse(localStorage.getItem("todos")); //parse back the item into array
  }
  //get index of todo item
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1); //remove at item index and only 1 elements

  //set back local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}
