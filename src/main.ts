import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import { VueQueryPlugin } from 'vue-query';
import router from './router/router';
import { worker } from '@/mocks/worker';
import '@/styles/colors.scss';

// Run mocking api server
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

createApp(App) //
  .use(VueQueryPlugin)
  .use(ElementPlus)
  .use(router)
  .mount('#app');
