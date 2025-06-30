import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const data = await response.json()
      setTasks(data)
    }
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const nightTasks = tasks.filter((task) => task.time === "night")

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return { ...task, status: task.status }
      }
      if (task.status === "not_started") {
        toast.success("Tarefa iniciada")
        return { ...task, status: "in_progress" }
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso")
        return { ...task, status: "done" }
      }
      if (task.status === "done") {
        toast.success("Tarefa reiniciada")
        return { ...task, status: "not_started" }
      }
      return task
    })
    setTasks(newTasks)
  }

  const onDeleteTaskSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    toast.success("Tarefa deletada com sucesso!")
  }

  const onAddTaskSuccess = async (newTask) => {
    setTasks([...tasks, newTask])
    toast.success("Tarefa adicionada com sucesso!")
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h1 className="text-xl font-semibold">Minhas Tarefas</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            <TrashIcon />
            Limpar tarefas
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon />
            Adicionar tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            onSubmitSuccess={onAddTaskSuccess}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa encontrada para o período da manhã
            </p>
          )}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa encontrada para o período da tarde
            </p>
          )}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa encontrada para o período da noite
            </p>
          )}
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
