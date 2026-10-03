import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import primeVuePlugin from './utils/primevue/config.ts';

createApp(App)
    .use(createPinia())
    .use(router)
    .use(primeVuePlugin)
    .mount('#app');