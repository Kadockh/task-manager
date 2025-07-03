import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"

import { LoaderIcon } from "../assets/icons"
import { useDeleteAllTasks } from "../hooks/data/use-delete-all-tasks"
import Button from "./Button"

const ConfirmDeleteDialog = ({ isOpen, handleClose }) => {
  const { mutateAsync: deleteAllTasks, isPending } = useDeleteAllTasks()
  const nodeRef = useRef()

  const handleConfirmClick = async () => {
    await deleteAllTasks(undefined, {
      onSuccess: () => {
        handleClose()
        toast.success("Todas as tarefas foram removidas com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao remover tarefas. Por favor, tente novamente.")
      },
    })
  }

  const handleCancelClick = () => {
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Confirmar Exclusão
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Tem certeza que deseja excluir todas as tarefas?
              </p>
              <p className="mb-6 text-sm text-brand-text-gray">
                Esta ação não pode ser desfeita.
              </p>

              <div className="flex gap-3">
                <Button
                  size="md"
                  className="w-full"
                  color="secondary"
                  onClick={handleCancelClick}
                  type="button"
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button
                  size="md"
                  className="w-full"
                  color="danger"
                  onClick={handleConfirmClick}
                  type="button"
                  disabled={isPending}
                >
                  {isPending ? (
                    <LoaderIcon className="animate-spin text-brand-white" />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

ConfirmDeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ConfirmDeleteDialog
