class KeyboardShortcuts {
  /**Control whenever the keyboard shortcut is going to be disabled or not.
   * `true` when you can use the keyboard shortcut, otherwise `false`
   * @type {boolean}
   */
  static disableShortcut = false
  /**I don't know to describe what this class does, but it's doing some keyboard shortcuts things .
   * Call {@link KeyboardShortcuts.initialize()} to initialize all of the keyboard shortcuts
   */
  constructor() {
    document.addEventListener('keydown', this.#initShortcut)
  }

  #mainContent = document.querySelector('div.todo-main-content')
  #isShowingSidebar = true
  /**
   * @param {KeyboardEvent} keyboardEvent
   */
  #initShortcut = (keyboardEvent) => {
    if (KeyboardShortcuts.disableShortcut) {
      return console.log('keyboard shortcuts disabled')
    }

    const keypress = keyboardEvent.key

    if (keypress === 'm') {
      this.#isShowingSidebar = !this.#isShowingSidebar
      if (this.#isShowingSidebar) 
        return this.#mainContent?.setAttribute('show-sidebar', 'true')
      return this.#mainContent?.setAttribute('show-sidebar', 'false')
    }

    if (keypress === 'a') {
      document.addEventListener('keydown', this.#shortcutStartWithA)
      return console.log('[sub-keyboard-shortcut] "a" pressed')
    }
  }
  /**Please give me a name lol
   * @param {KeyboardEvent} keyboardEvent
   */
  #shortcutStartWithA = (keyboardEvent) => {
    const keypress = keyboardEvent.key
    console.log(`"${keypress}" pressed`)
    if (keypress === 't') {
      if (!addTodoButton) return
      return new AddTaskMenu(addTodoButton).showMenu(taskData => {
        addTask({ ...taskData, isCompleted: false })
      })
    }

    document.removeEventListener('keydown', this.#shortcutStartWithA)
  }
}