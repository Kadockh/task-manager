import { createPortal } from "react-dom"

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="itens-center fixed bottom-0 left-0 top-0 flex h-screen w-screen justify-center bg-black/50 backdrop-blur-sm">
      <div className=" p-5 rounded-xl text-center bg-white shadow-lg">
        <h2 className="text-xl font-semibold text-[#35383e]">Nova Tarefa</h2>
        <p className="text-sm text-[#9a9c9f]">Insira as informações da tarefa</p>

        <div className="mt-4">
            <label htmlFor="title" className="block text-sm font-medium text-[#35383e]">
                Título
            </label>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
