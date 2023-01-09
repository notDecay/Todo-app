class AddTaskMenu {
  #todoMenu
  #createTaskHintElement
  #menuStructure = `
    <div class="add-new-todo-input-area">
      <input type="text" placeholder="Task name" id="input-task-name" maxlength="90" autocomplete="off"> <br>
      <input type="text" placeholder="Task description" id="input-task-description" autocomplete="off">
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
  /**Create the task menu
   * @param   {HTMLDivElement}  createTaskHintElement 
   * the element where the menu is going to be created, it should look like this.  
   * ```html
   *    <div class="add-new-todo-hint">...</div>
   * ```
   * @throws  {@link FailedToFindElement} if it does not exist
   * @throws  {@link TypeError}           if this element class name is not `"add-new-todo-hint"`
   */
  constructor(createTaskHintElement) {
    if (!createTaskHintElement) throw new FailedToFindElement()
    if (createTaskHintElement.className !== 'add-new-todo-hint') 
      throw new TypeError('this element must be a <div> that has a class name of "add-new-todo-hint"')
    const todoMenu = document.createElement('div')
    todoMenu.className = 'add-new-todo-menu'
    todoMenu.innerHTML = this.#menuStructure

    this.#todoMenu = todoMenu
    this.#createTaskHintElement = createTaskHintElement
  }

  #isShowing = false
  /**Show the add new todo menu when you click the "add todo".
   * @param    {(taskData: TaskContentData) => any} onPressAddTodoButton 
   * a callback function that fired when you click the "add todo" button. This callback function 
   * contain 1 argument - it's the task data
   * @event    `"onclick"`                 for handle button press
   * @event    `KeyboardEvent ("keyup")`   for *keyboard shortcuts*
   * @returns  {void}    nothing
   */
  showMenu(onPressAddTodoButton) {
    KeyboardShortcuts.disableShortcut = true
    if (this.#isShowing) return console.log('todo editor is already showing')
    this.#todoMenu.setAttribute('is-showing', 'true')
    addElementBefore(this.#createTaskHintElement, this.#todoMenu)
    this.#initMenuFunctionality(onPressAddTodoButton)
    document.addEventListener('keyup', this.#removeMenuWhenPressESC)
    this.#isShowing = true
  }

  /**Remove the menu completely and the event listeners
   * @returns  {void}    nothing
   */
  removeMenu() {
    KeyboardShortcuts.disableShortcut = false
    this.#todoMenu.remove()
    document.removeEventListener('keypress', this.#removeMenuWhenPressESC)
    this.#isShowing = false
  }

  /**This function will initialize the menu functionality like actions when click the
   * "add task" or "cancel" button, menu shortcut / keyboard events
   * @param    {(taskData: TaskContentData) => any} onPressAddTodoButton
   */
  #initMenuFunctionality(onPressAddTodoButton) {
    const { 
      taskName, 
      taskDescription, 
      addTaskButton, 
      cancelTaskButton 
    } = this.#getThisMenuElements()

    const submit = () => {
      if (taskName.value === '') return console.log('The task name is required')
      onPressAddTodoButton({ 
        name: taskName.value, 
        description: taskDescription.value
      })

      taskName.value = ''
      taskDescription.value = ''
    }

    addTaskButton.onclick = () => submit()
    cancelTaskButton.onclick = () => this.removeMenu()
    
    taskName.addEventListener('keypress', (keyboardEvent) => {
      if (keyboardEvent.code !== 'Enter') return console.log('you does not press Enter')
      submit()
    })

    taskDescription.addEventListener('keypress', (keyboardEvent) => {
      if (keyboardEvent.code !== 'Enter') return console.log('you does not press Enter')
      submit()
    })
  }

  /**
   * @param {KeyboardEvent} keyboardEvent
   * @see   {@link AddTaskMenu.showMenu()}
   * @see   {@link AddTaskMenu.removeMenu()}
   */
  #removeMenuWhenPressESC = (keyboardEvent) => {
    if (keyboardEvent.code !== 'Escape') return
    if (this.#isShowing) this.removeMenu()
    else console.log('ESC key ignored')
  }

  /**Get all of the "add todo" menu elements
   * @throws  {@link FailedToFindElement} if it could not find one of the menu element
   * @returns                             the input task name, description and 2 buttons
   */
  #getThisMenuElements() {
    /**@type {HTMLInputElement | null} */
    const taskName = document.querySelector('input#input-task-name')
    /**@type {HTMLInputElement | null} */
    const taskDescription = document.querySelector('input#input-task-description')
    /**@type {HTMLButtonElement | null} */
    const addTaskButton = document.querySelector('button#button-add-task')
    /**@type {HTMLButtonElement | null} */
    const cancelTaskButton = document.querySelector('button#button-cancel')

    if (
      !taskName || !taskDescription || !addTaskButton || !cancelTaskButton 
    ) throw new FailedToFindElement()
    return { taskName, taskDescription, addTaskButton, cancelTaskButton }
  }
}