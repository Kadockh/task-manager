import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "./Button"

function Tasks() {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adb5]">
            Minhas Tarefas
          </span>
          <h1 className="text-xl font-semibold">Minhas Tarefas</h1>
        </div>
        <div className="flex items-center gap-3">
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

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <SunIcon />
            <p className="text-sm text-[#9a9c9f]">Manhã</p>
          </div>
        </div>

        <div className="my-6 space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <CloudSunIcon />
            <p className="text-sm text-[#9a9c9f]">Tarde</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <MoonIcon />
            <p className="text-sm text-[#9a9c9f]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
