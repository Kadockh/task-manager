import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useUpdateTask = (taskId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["updateTask", taskId],
        mutationFn: async (data) => {
            const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, data)
            queryClient.setQueryData("tasks", (oldTasks) => {
                return oldTasks.map((task) => {
                    if (task.id === taskId) {
                        return updatedTask
                    }
                    return task
                })
            })
            queryClient.setQueryData(["task", taskId], updatedTask)
        },
    })
}