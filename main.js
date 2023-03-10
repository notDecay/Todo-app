/**An note from Duck: 
 * This just a small project that I'm testing my skill, and this is not the stable build / final version.
 * Feel free to learn something from here, experiment, or try to break this app
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this *app* 
 * and associated documentation files
 * 
 * @version 1.0.0 dev
 * @author  Duck
 */
//
let onTyping
const existingTasks = TaskData.getData()

/**This element is a part of {@link showAddTodoMenu()} function
 * @type {HTMLDivElement | null}
 */
const addTodoButton = document.querySelector('div#add-todo')

/**This is the main entry point of the app
 * @returns {Promise<void>}
 * @event   `window.onload`
 * @public
 */
async function main() {
  const APP_VERSION = '1.0.0 dev'
  console.log('App version '+APP_VERSION)
  
  if (!addTodoButton) return

  const menu = new AddTaskMenu(addTodoButton)
  addTodoButton.onclick = () => {
    menu.showMenu(taskData => {
      addTask({ ...taskData, isCompleted: false })
    })
  }
  // Showing the task when you refresh the page
  existingTasks.forEach(task => addTask(task))
  new KeyboardShortcuts()
}

/**Adding a task
 * @param   {ITaskData} taskData the task data, see {@link ITaskData} interface for more info
 * @returns {void}               nothing
 * @private
 */
function addTask(taskData) {
  console.log('task mounted')
  // Create a new element
  new TaskList(taskData)
  // save it to the localStorage
  TaskData.saveData(taskData)
}

window.onload = main