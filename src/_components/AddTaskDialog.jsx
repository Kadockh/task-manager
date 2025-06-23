import "./AddTaskDialog.css"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 as uuidv4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()
  const nodeRef = useRef()

  const handleSaveClick = () => {
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

    handleSubmit({
      id: uuidv4(),
      title: title || "Tarefa sem título",
      description: description || "Tarefa sem descrição",
      time,
      status: "not_started",
    })
    handleClose()
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
                />

                <TimeSelect ref={timeRef} errorMessage={timeError?.message} />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrição da tarefa"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.message}
                />
                <div className="flex gap-3">
                  <Button
                    size="md"
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="md"
                    className="w-full"
                    onClick={handleSaveClick}
                  >
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

export default AddTaskDialog
