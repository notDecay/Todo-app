/**This class responsible for load, update and save the data from {@link localStorage}
 * @class TaskData
 */
class TaskData {
  static #KEY_NAME = 'tasks'
  /**Get all of the task datas from {@link localStorage}.
   * Returns an array of task data or just empty array if no task found
   * @return {ITaskData[]}
   */
  static getData() {
    return JSON.parse(localStorage.getItem(this.#KEY_NAME) || '[]')
  }

  /**@type {ITaskData[]} */
  static #arrayOfTaskData = []
  /**Save the task data from {@link localStorage}
   * @param {ITaskData} taskData the task data
   * @returns {void} nothing
   */
  static saveData(taskData) {
    this.#arrayOfTaskData.push(taskData)
    localStorage.setItem(this.#KEY_NAME, JSON.stringify(this.#arrayOfTaskData))
  }

  /**Clear all of the task data from {@link localStorage}, this function is only for development
   * @returns {void} nothing
   */
  static clearData() {
    localStorage.removeItem(this.#KEY_NAME)
    window.location.reload()
  }
}