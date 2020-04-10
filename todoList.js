//Runs once dom is loaded, uses three global variables to avoid retyping 
//Needs

document.addEventListener('DOMContentLoaded', () => {

const todoArea = document.querySelector('#todoArea');
const todoValue = document.querySelector('input[name="todo"]');
const formField = document.querySelector('#todoForm');
let localTodos = JSON.parse(localStorage.getItem('todos')) || [];

//Adds new todo to todo section and saves it automatically to local storage
formField.addEventListener('submit', (e) => {
  e.preventDefault();   
  let newTodo = createTodo(todoValue);
  todoArea.appendChild(newTodo);
  let todoArray = saveLocally(newTodo);
  console.log(todoArray);
  localStorage.setItem('todos', JSON.stringify(todoArray));  
});

//Adds functionality for deleting or striking through finished todo
todoArea.addEventListener('click', (e) => {
    if(e.target.id === 'delete'){
        e.target.parentElement.remove();
    }
    else if(e.target.id === 'finished'){
        e.target.parentElement.style.textDecoration = 'line-through';
    }
});

//Creates the actual todo with the strike throgh button and delete button
const createTodo = (todovalue) => {
  const newTodo = document.createElement('li');
  newTodo.innerText = todoValue.value;
  newTodo.id = 'task';
  todoValue.value = '';
  const completeBttn = buttonMaker(true);
  const removeBttn = buttonMaker(false);
  newTodo.appendChild(completeBttn);
  newTodo.appendChild(removeBttn);
  return newTodo;
};

//use CSS to style buttons, avoid uptake to localstorage of innertext
const buttonMaker = (button) => {
  if(button === true){
  let goodBttn = document.createElement('button');
  goodBttn.id = 'finished';
  return goodBttn;
  }
  else{
  let badBttn = document.createElement('button');
  badBttn.id = 'delete';
  return badBttn;
  }
}

//This function feels dirty, returning global variable change
const saveLocally = (todo) =>{
  localTodos.push({todo: todo.innerText});
  return localTodos;
};

//Appends the items in the local storage with buttons
if(localStorage.getItem('todos')){
    for (let i = 0 ; i < localTodos.length; i++){  
      let addLi = document.createElement('li');
      addLi.innerText = localTodos[i].todo;
      let completed = buttonMaker(true);
      let deleted = buttonMaker(false);
      todoArea.appendChild(addLi);
      addLi.appendChild(completed);
      addLi.appendChild(deleted);
    }
  }
  else{
    localStorage.clear;
  }

});