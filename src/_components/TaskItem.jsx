import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const TaskItem = ({ task, handleTaskCheckboxClick }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5] text-[#00ADB5]"
    }
    if (task.status === "in_progress") {
      return "bg-[#FFAA04] text-[#FFAA04]"
    }
    if (task.status === "not_started") {
      return "bg-[#353839] bg-opacity-10 text-[#353839]"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`${getStatusClasses()} relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleTaskCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon className="h-4 w-4" />}
          {task.status === "in_progress" && (
            <LoaderIcon className="h-4 w-4 animate-spin text-white" />
          )}
        </label>
        <p>{task.title}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <TrashIcon className="h-4 w-4 text-red-400" />
        </Button>
        <a href="#" className="transition hover:opacity-70">
          <DetailsIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
