// FInding elements
const todoForm = document.querySelector(".todoForm");
const inputTodo = document.querySelector("#inputTodo");
const addBtn = document.querySelector("#btn");
const todoList = document.querySelector("#lists");
const message = document.querySelector("#toast");

//Todo add
todoForm.addEventListener(
  "submit",
  (addTodo = (e) => {
    e.preventDefault();
    const inputValue = inputTodo.value;

    // create unique id
    const unqId = Date.now().toString();

    createTodo(inputValue, unqId);
    showMessage("Successfully added", "success");

    // local storage data set
    let todos = fromLocalStorage();
    todos.push({ inputValue, unqId });
    localStorage.setItem("myTodos", JSON.stringify(todos));
    inputTodo.value = "";
  })
);

//todo Create Todo
let createTodo = (inputValue, unqId) => {
  let todoElement = document.createElement("li");
  todoElement.id = unqId;
  todoElement.innerHTML = `
  <span>${inputValue}</span>
  <span>
  <button class='submitBtn' id='dltBtn'><i class='fa fa-trash'></i></button>
  </span>
  `;
  todoList.appendChild(todoElement);

  //   Style add using css class in todo list
  todoElement.classList.add("list-style");

  //   delete todo using button
  const deleteButton = document.querySelector("#dltBtn");
  deleteButton.addEventListener("click", deleteTodo);
};

//todo  create show message
const showMessage = (toast, status) => {
  message.textContent = toast;
  //   Style add using css class in todo list
  message.classList.add(`toast-${status}`);
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove(`toast-${status}`);
  }, 1000);
};

//todo get data from local storage
const fromLocalStorage = () => {
  return localStorage.getItem("myTodos")
    ? JSON.parse(localStorage.getItem("myTodos"))
    : [];
};

//todo delete todo from list using dlt button
const deleteTodo = (e) => {
  const selectedTodo = e.target.parentElement.parentElement.parentElement;
  console.log(selectedTodo);
  todoList.removeChild(selectedTodo);
  showMessage("Deleted Successfully", "danger");

  //   delete selected item from local storage
  let getTodo = fromLocalStorage();
  let othersTodo = getTodo.filter((todo) => todo.unqId !== selectedTodo.id);
  localStorage.setItem("myTodos", JSON.stringify(othersTodo));
};

//todo show save data in app from local storage
window.addEventListener(
  "DOMContentLoaded",
  (showTodo = () => {
    let allTodos = fromLocalStorage();
    allTodos.map((todo) => createTodo(todo.inputValue, todo.unqId));
  })
);
