import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Aura from '@primeuix/themes/aura'
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from "primevue/button"
import Card from 'primevue/card';
import DatePicker from 'primevue/datepicker';
import Dialog from "primevue/dialog";
import Divider from 'primevue/divider';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import PrimeVue from 'primevue/config';
import ProgressSpinner from 'primevue/progressspinner';
import Ripple from 'primevue/ripple';
import Select from 'primevue/select';
import StyleClass from 'primevue/styleclass';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
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
                darkModeSelector: '.autoboxex-dark',
            }
        },
        ripple: true
    })
    .use(ToastService)
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)
    .component('AutoComplete',AutoComplete)
    .component('Avatar', Avatar)
    .component('Badge', Badge)
    .component('Button', Button)
    .component('Card', Card)
    .component('Column', Column)
    .component('DataTable', DataTable)
    .component('DatePicker', DatePicker)
    .component('Dialog', Dialog)
    .component('Divider', Divider)
    .component('FloatLabel',FloatLabel)
    .component('Form', Form)
    .component('IconField', IconField)
    .component('InputIcon', InputIcon)
    .component('InputText', InputText)
    .component('Message', Message)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Select', Select)
    .component('Textarea', Textarea)
    .component('Toast', Toast)
    .mount('#app')
