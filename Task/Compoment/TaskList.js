
class TaskList {
  #taskList = document.querySelector('ul.tasks-list')
  /**Creating the task list *element*.  
   * This is where all of the task should be shown, located in here:
   * ```html
   * <!-- More element at the top -->
   * <div class="task-editor">
   *   <section class="top-section-warpper">
   *     <ul class="tasks-list">Task(s) should be mounted in here</ul>
   *     ...
   *   </section>
   * </div>
   * ```
   *
   * @param {ITaskData} taskData the task data
   * @throws {@link FailedToFindElement} if it could not find the element to append the newbie-created task
   * @compoment_type element
   */
  constructor(taskData) {
    if (!this.#taskList) throw new FailedToFindElement()
    const { name, description } = taskData
    // <li class="task" completed="true">
    const task = document.createElement('li')
    task.className =  'task'
    task.setAttribute('completed', 'false')
    //   <div class="task-status-wrapper">
    //     <task-status>
    //       <i class="icon-task-complete fa-solid fa-check"></i>
    //     </task-status>
    //   </div>
    const taskStatusWrapper = document.createElement('div')
    taskStatusWrapper.className = 'task-status-wrapper'
    const taskStatus = document.createElement('task-status')
    taskStatus.innerHTML = `<i class="icon-task-complete fa-solid fa-check"></i>`
    taskStatusWrapper.append(taskStatus)
    //   <div class="task-content-wrapper">
    //     <div class="task-content-name">name</div>
    //     <div class="task-content-description">description</div>
    //   </div>
    const taskContentWrapper = document.createElement('div')
    taskContentWrapper.className = 'task-content-wrapper'
    const taskName = document.createElement('div')
    taskName.className =  'task-content-name'
    taskName.innerHTML =  name
    if (description === undefined) {
      taskContentWrapper.append(taskName)
    }
    else {
      const taskDescription = document.createElement('div')
      taskDescription.className =  'task-content-description'
      taskDescription.innerHTML =  description
      taskContentWrapper.append(taskName, taskDescription)
    }
    // </li>
    task.append(taskStatusWrapper, taskContentWrapper)

    // make it appear to the screen
    this.#taskList.appendChild(task)
    this.#initFunctionality(task, taskStatus)
  }

  /**
   * @param {HTMLLIElement} task 
   * @param {HTMLElement} taskStatus 
   */
  #initFunctionality(task, taskStatus) {
    let thisTaskStatus = booleanStringToBoolean(task.getAttribute('completed'))
    taskStatus.onclick = () => {
      thisTaskStatus = !thisTaskStatus
      if (thisTaskStatus === true)
        task.setAttribute('completed', 'true')
      else task.setAttribute('completed', 'false')
    }
    
  }
}