import DailyTaskPage from '@/pages/DailyTaskPage.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AppTodo from '@/components/AppTodo.vue';
import AppDoing from '@/components/AppDoing.vue';
import AppDone from '@/components/AppDone.vue';

// Route Name 을 먼저 정의해서 사용합니다.
// 이 후 <RouteLink>의 named 라우팅을 할 때, AppRouteNames 타입 정의를 통해 오탈자로 인한 에러를 방지합니다.
export type AppRouteNames =
  | 'daily-task'
  | 'daily-task-todo'
  | 'daily-task-doing'
  | 'daily-task-done';

type AppRouteRecordRaw = Omit<RouteRecordRaw, 'name'> & { name: AppRouteNames };

const routes: AppRouteRecordRaw[] = [
  {
    name: 'daily-task',
    path: '/',
    component: DailyTaskPage,
    children: [
      {
        name: 'daily-task-todo',
        path: 'todo',
        component: AppTodo,
      },
      {
        name: 'daily-task-doing',
        path: 'doing',
        component: AppDoing,
      },
      {
        name: 'daily-task-done',
        path: 'done',
        component: AppDone,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});

export default router;
