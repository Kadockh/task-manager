import { Toaster } from "sonner"

import Sidebar from "./_components/Sidebar"
import Tasks from "./_components/Tasks"

function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: "#35383E",
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App
