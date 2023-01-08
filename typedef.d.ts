
interface ITaskData {
  /**The task name */
  name: string
  isCompleted: boolean
  /**The task description, this is optional */
  description?: string
}

/**@see {@link ITaskData} */
type TaskContentData = Omit<ITaskData, "isCompleted" | "uuid">