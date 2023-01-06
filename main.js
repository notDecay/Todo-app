const APP_VERSION = '1.0.0 dev'

/**This is the main entry point of the app
 * @returns {Promise<void>}
 * @event   `window.onload`
 * @public
 */
async function main() {
  console.log('App version '+APP_VERSION)
  
  await initPageFunctionality()
  // get all of the todo elements
  
  
  
  // render all of the todo
  // existingTodos.forEach(todo => addTodo(todo, arrayOfTodoData, todoList, todoInput))
  // // add a new todo when you click the add todo button
  // addTodoButton.onclick = (mouseEvent) => {
  //   const todoData = todoInput.value
  //   mouseEvent.preventDefault()
  //   if (todoData === '') return
  //   addTodo(todoData, arrayOfTodoData, todoList, todoInput)
  // }
}

async function initPageFunctionality() {
  // get all of the todos from localStorage
  const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]')
  /**@type {string[]} */ 
  const arrayOfTodoData = []

  const todoList = document.querySelector('ul.todos-list')

  /**@type HTMLDivElement | null */
  const addTodoButton = document.querySelector('div#add-todo')
  addTodoButton?.addEventListener('click', () => {
    showAddTodoMenu(addTodoButton, data => {
      arrayOfTodoData.push(data.taskName)
      // Create a new element
      // <ul class="todos-list">
      //   <li class="todo"></li>
      // </ul>
      const todo = document.createElement('li')
      todo.className = 'todo'
      todo.innerHTML = data.taskName
      todoList?.appendChild(todo) // make it appear to the screen
      localStorage.setItem('todos', JSON.stringify(arrayOfTodoData)) // save it to the localStorage
    })
  })
}

/**Clear all of the todo data from {@link localStorage}, this function
 * is only for development
 * @returns {void} nothing
 * @private
 */
function clearCacheData() {
  localStorage.removeItem('todos')
  window.location.reload()
}

window.onload = main