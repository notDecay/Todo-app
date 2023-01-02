const APP_VERSION = '1.0.0 dev'


async function main() {
  log('app version '+APP_VERSION)
  // get all of the todo elements
  const todoCompoment = getTodoElements()
  if (todoCompoment === undefined) return
  const { addTodoButton, todoInput, todoList } = todoCompoment
  // get all of the todos from localStorage
  const existingTodos = await getTodoData()
  /**@type {string[]} */ 
  const arrayOfTodoData = []
  // render all of the todo
  existingTodos.forEach(todo => addTodo(todo, arrayOfTodoData, todoList, todoInput))
  // add a new todo when you click the add todo button
  addTodoButton.onclick = (mouseEvent) => {
    mouseEvent.preventDefault()
    addTodo(todoInput.value, arrayOfTodoData, todoList, todoInput)
  }
}


function addTodo(todoData, arrayOfTodoData, todoList, todoInput) {
  log('Todo mounted')
  arrayOfTodoData.push(todoData)
  // Create a new element
  // <ul class="todos-list">
  //   <li class="todo"></li>
  // </ul>
  const todo = document.createElement('li')
  todo.className = 'todo'
  todo.innerHTML = todoData
  todoList.appendChild(todo) // make it appear to the screen
  localStorage.setItem('todos', JSON.stringify(arrayOfTodoData)) // save it to the localStorage
  todoInput.value = '' // reset the input value
}


function clearCacheData() {
  localStorage.removeItem('todos')
  window.location.reload()
}


async function getTodoData() {
  return new Promise((resolve) => {
    resolve(JSON.parse(localStorage.getItem('todos') || '[]'))
  })
}


function getTodoElements() {
  /**@type {HTMLButtonElement | null} */
  const addTodoButton  = document.querySelector('button.add-todo-button')
  /**@type {HTMLInputElement | null} */
  const todoInput = document.querySelector("input[name='todo']")
  const todoList = document.querySelector('ul.todos-list')
  if (addTodoButton === null) return void console.error('failed to find the element')
  if (todoList === null) return void console.error('failed to find the element')
  if (todoInput === null) return void console.error('failed to find the element')

  return { addTodoButton, todoInput, todoList }
}


function log(message) {
  logInfo('Todo', '#ff8484ff', message)
}

window.onload = main