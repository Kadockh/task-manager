import { AddIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

function Tasks() {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-gray-500">
            Minhas Tarefas
          </span>
          <h1 className="text-3xl font-semibold">Minhas Tarefas</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">
            <TrashIcon />
            Limpar tarefas
          </Button>

          <Button>
            <AddIcon />
            Adicionar tarefa
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Tasks
