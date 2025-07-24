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
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import { Form } from '@primevue/forms';

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
                // darkModeSelector: 'system',
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
    .component('Divider', Divider)
    .component('Toast', Toast)
    .component('Form', Form)
    .mount('#app')
