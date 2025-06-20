import "./AddTaskDialog.css"

import { useRef } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

import Button from "./Button"
import Input from "./Input"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()

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
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrição da tarefa"
                />
                <Input
                  id="time"
                  label="Horário"
                  placeholder="Horário da tarefa"
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
                  <Button size="md" className="w-full">
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
