import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "./Button"
import TaskSeparator from "./TaskSeparator"

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
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  )
}

export default Tasks
