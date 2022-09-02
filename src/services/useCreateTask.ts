import { createTask } from './api';
import type { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'vue-query';
import type { Task } from './model';

const useCreateTask = (querykey: string) => {
  const queryClient = useQueryClient();

  return useMutation((task: Task) => createTask(task), {
    onMutate: async (item: Task) => {
      console.log('refetchCancle');
      await queryClient.cancelQueries(querykey);

      const previousValue = queryClient.getQueryData<Task[]>(querykey);
      if (previousValue) {
        queryClient.setQueryData(querykey, [...(previousValue as Task[]), item]);
      }
      return { previousValue };
    },

    onError: (err: AxiosError, variables: Task, context: any) => {
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

export default useCreateTask;
