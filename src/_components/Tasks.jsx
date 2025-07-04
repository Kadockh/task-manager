import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import { taskQueryKeys } from "../keys/queries"
import { api } from "../lib/axios"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const { data: tasks } = useGetTasks()
  const queryClient = useQueryClient()
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [dragOverPeriod, setDragOverPeriod] = useState(null)

  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const nightTasks = tasks?.filter((task) => task.time === "night")

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.setData("text/plain", taskId)
  }

  const handleDragOver = (e, period) => {
    e.preventDefault()
    setDragOverPeriod(period)
  }

  const handleDragLeave = () => {
    setDragOverPeriod(null)
  }

  const handleDrop = (e, targetPeriod) => {
    e.preventDefault()
    setDragOverPeriod(null)

    const taskId = e.dataTransfer.getData("text/plain")
    const draggedTask = tasks?.find((task) => task.id === taskId)

    if (draggedTask && draggedTask.time !== targetPeriod) {
      updateTaskPeriod(taskId, targetPeriod)
    }

    setDraggedTaskId(null)
  }

  const updateTaskPeriod = async (taskId, newPeriod) => {
    try {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        time: newPeriod,
      })

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask
          }
          return task
        })
      })

      toast.success(
        `Tarefa movida para ${getPeriodLabel(newPeriod)} com sucesso!`
      )
    } catch (error) {
      toast.error("Erro ao mover tarefa. Por favor, tente novamente.")
    }
  }

  const getPeriodLabel = (period) => {
    switch (period) {
      case "morning":
        return "manhã"
      case "afternoon":
        return "tarde"
      case "night":
        return "noite"
      default:
        return ""
    }
  }

  const renderTaskSection = (tasks, period, title, icon) => {
    const isDragOver = dragOverPeriod === period
    const sectionClasses = `space-y-3 rounded-lg p-4 transition-colors duration-200 ${
      isDragOver ? "bg-blue-50 border-2 border-blue-300 border-dashed" : ""
    }`

    return (
      <div
        className={sectionClasses}
        onDragOver={(e) => handleDragOver(e, period)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, period)}
      >
        <TaskSeparator title={title} icon={icon} />
        {tasks?.length === 0 && (
          <p className="flex min-h-[40px] items-center justify-center text-sm text-brand-text-gray">
            {dragOverPeriod === period
              ? "Solte a tarefa aqui para movê-la"
              : `Nenhuma tarefa cadastrada para o período da ${getPeriodLabel(period)}.`}
          </p>
        )}
        {tasks?.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            className={`cursor-move transition-opacity duration-200 ${
              draggedTaskId === task.id ? "opacity-50" : "opacity-100"
            }`}
          >
            <TaskItem task={task} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

      <div className="rounded-xl bg-white p-6">
        {renderTaskSection(morningTasks, "morning", "Manhã", <SunIcon />)}
        <div className="my-6">
          {renderTaskSection(
            afternoonTasks,
            "afternoon",
            "Tarde",
            <CloudSunIcon />
          )}
        </div>
        {renderTaskSection(nightTasks, "night", "Noite", <MoonIcon />)}
      </div>
    </div>
  )
}

export default Tasks
