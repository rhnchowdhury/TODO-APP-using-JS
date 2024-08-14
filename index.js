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
    showMessage();
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
};

//todo  create show message
const showMessage = () => {
  message.textContent = "Successfully added";
  //   Style add using css class in todo list
  message.classList.add("bg-success");
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove("bg-success");
  }, 1000);
};
