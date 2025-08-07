import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Aura from '@primeuix/themes/aura'
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from "primevue/button"
import Divider from 'primevue/divider';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import PrimeVue from 'primevue/config';
import ProgressSpinner from 'primevue/progressspinner';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
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
    .use(ToastService)
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)
    .component('Button', Button)
    .component('InputText', InputText)
    .component('Avatar', Avatar)
    .component('Badge', Badge)
    .component('Divider', Divider)
    .component('Toast', Toast)
    .component('ProgressSpinner', ProgressSpinner)
    .component('FloatLabel',FloatLabel)
    .component('Message', Message)
    .component('Form', Form)
    .mount('#app')
