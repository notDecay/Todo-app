/**Show the add new todo menu when you click the "add todo"
 * @param {HTMLDivElement | null} todoHintElement the div element of the add new todo
 * @param {(taskData: Omit<ITaskData, "isCompleted" | "uuid">) => any} onPressAddTodoButton 
 * a callback function that fired when you click the "add todo" button. This callback function 
 * contain 1 argument - it's the task data
 * 
 * @throws `TypeError` if it's not has a class name of `"add-new-todo-hint"`
 * @compoment_type menu
 * @public
 */
function showAddTodoMenu(todoHintElement, onPressAddTodoButton) {
  // checking stuff
  if (!todoHintElement) throw new FailedToFindElement()
  if (todoHintElement.className !== 'add-new-todo-hint') 
    throw new TypeError('this element must be a <div> that has a class name of "add-new-todo-hint"')
  // else we will create the menu
  const todoMenu = document.createElement('div')
  todoMenu.className = 'add-new-todo-menu'
  todoMenu.innerHTML = `
    <div class="add-new-todo-input-area">
      <input type="text" placeholder="Task name" id="input-task-name" maxlength="90"> <br>
      <input type="text" placeholder="Task description" id="input-task-description">
    </div>
    <div class="add-todo-buttons">
      <button class="add-todo-button" id="button-cancel">
        <i class="fa-solid fa-trash"></i> Cancel
      </button>
      <button class="add-todo-button" id="button-add-task">
        <i class="fa-solid fa-plus"></i> Add task
      </button>
    </div>
  `

  // make it appear on the screen
  addElementBefore(todoHintElement, todoMenu)

  // functionality stuff
  /**@type {HTMLInputElement | null} */
  const taskName = document.querySelector('input#input-task-name')
  /**@type {HTMLInputElement | null} */
  const taskDescription = document.querySelector('input#input-task-description')
  /**@type {HTMLButtonElement | null} */
  const addTodoButton = document.querySelector('button#button-add-task')
  /**@type {HTMLButtonElement | null} */
  const cancelTodoButton = document.querySelector('button#button-cancel')

  if (
    !taskName || !taskDescription || !addTodoButton || !cancelTodoButton 
  ) throw new FailedToFindElement()

  addTodoButton.onclick = () => {
    onPressAddTodoButton({ 
      name: taskName.value, 
      description: taskDescription.value
    })
    // clear the input 
    taskName.value = ''
    taskDescription.value = ''
  }

  cancelTodoButton.onclick = () => todoMenu.remove()
}