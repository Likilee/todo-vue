import { updateTask, type UpdateTasksParams } from './api';
import type { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'vue-query';
import type { Task } from './model';

const useUpdateTask = (querykey: string) => {
  const queryClient = useQueryClient();

  return useMutation((task: UpdateTasksParams) => updateTask(task), {
    onMutate: async ({ id, options }: UpdateTasksParams) => {
      console.log('refetchCancle');
      await queryClient.cancelQueries(querykey);

      const previousValue = queryClient.getQueryData<Task[]>(querykey);
      if (previousValue) {
        const index = previousValue.findIndex((task) => task.id === id);
        const updatedTasks = [...previousValue];
        updatedTasks[index] = { ...updatedTasks[index], ...options };
        console.log('찍어보자', updatedTasks);
        queryClient.setQueryData(querykey, updatedTasks);
      }
      return { previousValue };
    },

    onError: (err: AxiosError, variables: UpdateTasksParams, context: any) => {
      if (context?.previousValue) {
        queryClient.setQueryData<Task[]>(querykey, context.previousValue);
      }
    },

    onSettled: () => {
      console.log('refetch');
      queryClient.invalidateQueries(querykey); // 해당 key를 가진 쿼리들을 invalidate 시킨다. 즉, rerendering을 유발한다.
    },
  });
};

export default useUpdateTask;
