import { LoaderIcon, Tasks2Icon, TasksIcon } from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import DashboardCard from "./DashboardCard"

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter(
    (task) => task.status === "not_started"
  ).length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length
  const completedTasks = tasks?.filter((task) => task.status === "done").length

  return (
    <div className="grid grid-cols-4 gap-4">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        subText="Tarefas totais"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={notStartedTasks}
        subText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks}
        subText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        subText="Tarefas concluídas"
      />
    </div>
  )
}

export default DashboardCards
