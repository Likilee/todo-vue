import type { AxiosResponse } from 'axios';
import type { MutationFunction, QueryKey } from 'react-query/types/core';
import { useMutation, useQueryClient } from 'vue-query';
/**
 * ### 원리
 * 원리는 단순하다.
 * 1. mutate 수행을 시작할 때, 해당 mutate가 영향을 주는 data에 관한 쿼리를 취소시킨다.
 * 2. 해당 쿼리의 응답값을 조작하여 mutate를 통해 변경된 값을 서버의 상태와 상관없이 우선적으로 업데이트한다.
 *   =>빠르게 클라이언트에 반영된다.
 *
 * @param querykey : OptimizedMutation 을 수행할 쿼리의 키
 * @param mutateFn : post 메소드 등 muate 를 수행할 쿼리 함수
 * @returns uuseMutation 의 리턴값과 동일하다.
 */

export const useOptimizedMuation = <T>(
  querykey: QueryKey,
  mutateFn: MutationFunction<AxiosResponse<any, any>, T>
) => {
  const queryClient = useQueryClient();

  return useMutation(mutateFn, {
    onMutate: async (item: T) => {
      console.log('refetchCancle');
      await queryClient.cancelQueries(querykey);

      const previousValue = queryClient.getQueryData(querykey);
      if (previousValue) {
        queryClient.setQueryData(querykey, [...(previousValue as T[]), item]);
      }
      return { previousValue };
    },

    onError: (err, variables, context) => {
      if (context?.previousValue) {
        queryClient.setQueryData(querykey, context.previousValue);
      }
    },

    onSettled: () => {
      console.log('refetch');
      queryClient.invalidateQueries(querykey); // 해당 key를 가진 쿼리들을 invalidate 시킨다. 즉, rerendering을 유발한다.
    },
  });
};

// const addTaskMutation = useMutation((task: Task) => createTasks(task), {
//   onMutate: async (task) => {
//     console.log('refetchCancle');
//     await queryClient.cancelQueries(querykey);

//     const previousValue = queryClient.getQueryData(querykey);
//     if (previousValue) {
//       queryClient.setQueryData(querykey, [...(previousValue as Task[]), task]);
//     }
//     return { previousValue };
//   },

//   onError: (err, variables, context) => {
//     if (context?.previousValue) {
//       queryClient.setQueryData(querykey, context.previousValue);
//     }
//   },

//   onSettled: () => {
//     console.log('refetch');
//     queryClient.invalidateQueries(querykey); // 해당 key를 가진 쿼리들을 invalidate 시킨다. 즉, rerendering을 유발한다.
//   },
// });
