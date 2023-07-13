import { createApp } from 'vue'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification';
import './index.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
app.use(ToastPlugin);
app.mount('#app')
