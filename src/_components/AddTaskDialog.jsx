import "./AddTaskDialog.css"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [time, setTime] = useState("morning")

  useEffect(() => {
    if (!isOpen) {
      setTitle("")
      setDescription("")
      setTime("morning")
    }
  }, [isOpen])

  const nodeRef = useRef()

  const handleSaveClick = () => {
    if (!title.trim() || !description.trim() || !time.trim()) {
      toast.error("Por favor, preencha todos os campos")
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
              <h2 className="text-xl font-semibold text-[#35383e]">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-[#9a9c9f]">
                Insira as informações da tarefa
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrição da tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <div className="flex gap-3">
                  <Button
                    size="md"
                    className="w-full"
                    variant="secondary"
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
