import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';

import App from './App.vue'
import router from './router'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.my-app-dark',
            }
        },
        ripple: true
    })
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)
    .component('Button', Button)
    .component('InputText', InputText)
    .component('Avatar', Avatar)
    .component('Badge', Badge)
    .mount('#app')
