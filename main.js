const APP_VERSION = '1.0.0 dev'
/**This is the main entry point of the app
 * @returns {Promise<void>}
 * @event   `window.onload`
 */
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
  addTodoButton.onclick = (event) => {
    event.preventDefault()
    addTodo(todoInput.value, arrayOfTodoData, todoList, todoInput)
  }
}

/**Add a new todo 
 * @param {string} todoData             the todo data
 * @param {string[]} arrayOfTodoData    array of todo data that it's loaded from {@link localStorage}
 * @param {Element} todoList            the todo element that used to append the todo
 * @param {HTMLInputElement} todoInput  used to get the data from the input area, then append it to the `todoList`
 */
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

/**Clear all of the todo data from {@link localStorage}, this function
 * is only for development
 * @returns {void} nothing
 */
function clearCacheData() {
  localStorage.removeItem('todos')
  window.location.reload()
}

/**Get the todo data from {@link localStorage} or empty array
 * if there's no data
 * @returns {Promise<string[]>} a array of todo data
 */
async function getTodoData() {
  return new Promise((resolve) => {
    resolve(JSON.parse(localStorage.getItem('todos') || '[]'))
  })
}

/**Get all of the *todo HTML elements*
 * @returns {{
 *   addTodoButton: HTMLButtonElement,
 *   todoInput: HTMLInputElement,
 *   todoList: Element
 * } | undefined} a object of todo elements or `undefined` if it could not find one of the elements
 */
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

/**Just a log function
 * @param {*} message anything
 */
function log(message) {
  logInfo('Todo', '#ff8484ff', message)
}

window.onload = main