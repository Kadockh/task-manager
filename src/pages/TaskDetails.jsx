import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import Button from "../_components/Button"
import Input from "../_components/Input"
import Sidebar from "../_components/Sidebar"
import TimeSelect from "../_components/TimeSelect"
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import { useDeleteTask } from "../hooks/data/use-delete-task"
import { useGetTask } from "../hooks/data/use-get-task"
import { useUpdateTask } from "../hooks/data/use-update-task"

const TaskDetailsPage = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { taskId } = useParams()
  const { mutateAsync: updateTask } = useUpdateTask(taskId)
  const { mutateAsync: deleteTask } = useDeleteTask(taskId)
  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  })
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    await updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa salva com sucesso!")
      },
      onError: () => {
        toast.error("Ocorreu um erro ao salvar a tarefa.")
      },
    })
  }

  const handleDeleteClick = async () => {
    try {
      setIsDeleting(true)
      await deleteTask()
      toast.success("Tarefa deletada com sucesso!")
      navigate(-1)
    } catch (error) {
      toast.error("Ocorreu um erro ao deletar a tarefa.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <LoaderIcon className="animate-spin text-brand-white" />
            ) : (
              <TrashIcon />
            )}
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "O título é obrigatório.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode ser vazio."
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register("time", {
                  required: "O horário é obrigatório.",
                })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "A descrição é obrigatória.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição não pode ser vazia."
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>

          <div className="flex w-full justify-end gap-3 pt-4">
            <Button
              size="md"
              className="w-fit"
              color="secondary"
              onClick={handleBackClick}
              type="button"
            >
              Voltar
            </Button>
            <Button
              size="md"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <LoaderIcon className="animate-spin text-brand-white" />
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
