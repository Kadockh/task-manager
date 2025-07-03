import Sidebar from "../_components/Sidebar"
import Tasks from "../_components/Tasks"

function TasksPage() {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default TasksPage
