import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import { LoadingPlugin } from 'vue-loading-overlay';

import './style.css'
import 'vue-loading-overlay/dist/css/index.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ToastPlugin);
app.use(LoadingPlugin);
app.mount('#app')
