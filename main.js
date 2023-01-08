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

const existingTasks = TaskData.getData()

/**This is the main entry point of the app
 * @returns {Promise<void>}
 * @event   `window.onload`
 * @public
 */
async function main() {
  const APP_VERSION = '1.0.0 dev'
  console.log('App version '+APP_VERSION)
  
  /**This element is a part of {@link showAddTodoMenu()} function
   * @type {HTMLDivElement | null}
   */
  const addTodoButton = document.querySelector('div#add-todo')
  if (!addTodoButton) return

  const menu = new AddTaskMenu(addTodoButton)
  addTodoButton.onclick = () => {
    menu.showMenu(taskData => {
      addTask({ ...taskData, isCompleted: false })
    })
  }
  // Showing the task when you refresh the page
  existingTasks.forEach(task => addTask(task))
}

/**Adding a task
 * @param   {ITaskData} taskData the task data, see {@link ITaskData} interface for more info
 * @returns {void}               nothing
 * @private
 */
function addTask(taskData) {
  console.log('task mounted')
  new TaskList(taskData)
  TaskData.saveData(taskData)
}

window.onload = main