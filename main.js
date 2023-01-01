const APP_VERSION = '1.0.0 dev'

async function main() {
  log('app version '+APP_VERSION)
  const todoCompoment = getTodoElements()
  if (todoCompoment === null) return
  const { addTodoButton, todoInput, todoList } = todoCompoment
  
  /**@type {string[]} */
  const arrayOfTodoData = []
  const existingTodos = await getTodoData()
  /**Add a new todo 
   * @param {string} todoData
   */
  const addTodo = (todoData) => {
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

  existingTodos.forEach(todo => addTodo(todo))

  // Events
  addTodoButton.onclick = (event) => {
    event.preventDefault()
    addTodo(todoInput.value)
  }
}

function clearCacheData() {
  localStorage.removeItem('todos')
  window.location.reload()
}

/**Get the todo data from {@link localStorage}
 * @returns {Promise<string[]>} a array of todo data
 * @async
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
 * } | null} a object of elements or *nothing* if it could not find the elements
 */
function getTodoElements() {
  /**@type {HTMLButtonElement | null} */
  const addTodoButton  = document.querySelector('button.add-todo-button')
  /**@type {HTMLInputElement | null} */
  const todoInput = document.querySelector("input[name='todo']")
  const todoList = document.querySelector('ul.todos-list')
  if (addTodoButton === null) return null
  if (todoList === null) return null
  if (todoInput === null) return null

  return { addTodoButton, todoInput, todoList }
}

/**Just a log function
 * @param {*} message 
 */
function log(message) {
  logInfo('Todo', '#ff8484ff', message)
}

window.onload = main