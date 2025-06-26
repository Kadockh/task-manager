import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()
  const nodeRef = useRef()

  const handleSaveClick = async () => {
    setIsLoading(true)

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
      return
    }

    const task = {
      id: uuidv4(),
      title,
      description,
      time,
      status: "not_started",
    }

    const response = await fetch(`http://localhost:3000/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      setIsLoading(false)
      return toast.error(
        "Erro ao adicionar a tarefa. Por favor, tente novamente."
      )
    }
    onSubmitSuccess(task)
    handleClose()
    setIsLoading(false)
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="itens-center fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow-lg">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações da tarefa
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  ref={titleRef}
                  errorMessage={titleError?.message}
                  disabled={isLoading}
                />

                <TimeSelect ref={timeRef} errorMessage={timeError?.message} />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrição da tarefa"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.message}
                  disabled={isLoading}
                />
                <div className="flex gap-3">
                  <Button
                    size="md"
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="md"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading && <LoaderIcon className="animate-spin" />}
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
}

export default AddTaskDialog
