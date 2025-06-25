import PropTypes from "prop-types"
import { useState } from "react"
import { toast } from "sonner"

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      )
    }
    onDeleteSuccess(task.id)
    setDeleteIsLoading(false)
  }
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary"
    }
    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process"
    }
    if (task.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
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
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon className="h-4 w-4" />}
          {task.status === "in_progress" && (
            <LoaderIcon className="h-4 w-4 animate-spin text-white" />
          )}
        </label>
        <p>{task.title}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          size="sm"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin text-red-400" />
          ) : (
            <TrashIcon className="h-4 w-4 text-red-400" />
          )}
        </Button>
        
        <a href="#" className="transition hover:opacity-70">
          <DetailsIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "night"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
