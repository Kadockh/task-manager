import DashboardCard from "../_components/DashboardCard"
import Header from "../_components/Header"
import Sidebar from "../_components/Sidebar"
import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  const completedTasks = tasks?.filter((task) => task.status === "done").length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length
  const waterDrunk = 0

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Início" title="Início" />
        <div className="grid grid-cols-4 gap-4">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length}
            subText="Tarefas pendentes"
          />
          <DashboardCard
            icon={<TasksIcon />}
            mainText={completedTasks}
            subText="Tarefas concluídas"
          />
          <DashboardCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks}
            subText="Tarefas em andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText={waterDrunk}
            subText="Água"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
