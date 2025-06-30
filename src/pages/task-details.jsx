import { useEffect, useRef, useState } from "react"
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

const TaskDetailsPage = () => {
  const [saveIsLoading, setSaveIsLoading] = useState(false)

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const [errors, setErrors] = useState([])

  const handleSaveClick = async () => {
    setSaveIsLoading(true)

    const newError = []
    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newError.push({ inputName: "title", message: "Título é obrigatório" })
    }

    if (!description.trim()) {
      newError.push({
        inputName: "description",
        message: "Descrição é obrigatório",
      })
    }

    if (!time.trim()) {
      newError.push({ inputName: "time", message: "Horário é obrigatório" })
    }

    setErrors(newError)

    if (newError.length > 0) {
      return setSaveIsLoading(false)
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    })
    if (!response.ok) {
      setSaveIsLoading(false)
      return toast.error("Erro ao editar a tarefa. Por favor, tente novamente.")
    }
    const newTask = await response.json()
    setTask(newTask)
    toast.success("Tarefa editada com sucesso!")
    setSaveIsLoading(false)
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  const handleBackClick = () => {
    navigate(-1)
  }

  const [deleteIsLoading, setDeleteIsLoading] = useState(false)
  
  const handleDeleteTaskClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      )
    }
    toast.success("Tarefa deletada com sucesso!")
    setDeleteIsLoading(false)
    navigate(-1)
  }
  const params = useParams()
  const taskId = params.taskId
  const [task, setTask] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
    }
    fetchTask()
  }, [taskId])
  return (
    <div className="flex h-screen w-full">
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
            onClick={handleDeleteTaskClick}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? (
              <LoaderIcon className="amniate-spin h-4 w-4" />
            ) : (
              <TrashIcon />
            )}
            Deletar tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary" onClick={handleBackClick}>
            Voltar
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              "Salvar"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
