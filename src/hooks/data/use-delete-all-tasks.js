import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useDeleteAllTasks = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: taskMutationKeys.deleteAll(),
        mutationFn: async () => {
            const { data: tasks } = await api.get("/tasks")

            await Promise.all(
                tasks.map(task => api.delete(`/tasks/${task.id}`))
            )

            return tasks
        },
        onSuccess: () => {
            queryClient.setQueryData(taskQueryKeys.getAll(), () => {
                return []
            })
        },
    })
} 