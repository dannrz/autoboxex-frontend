import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Form } from '@primevue/forms';
import Aura from '@primeuix/themes/aura'
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from "primevue/button"
import Card from 'primevue/card';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import Dialog from "primevue/dialog";
import Divider from 'primevue/divider';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import OverlayBadge from 'primevue/overlaybadge';
import PrimeVue from 'primevue/config';
import ProgressSpinner from 'primevue/progressspinner';
import Ripple from 'primevue/ripple';
import Select from 'primevue/select';
import Skeleton from 'primevue/skeleton';
import StyleClass from 'primevue/styleclass';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

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
    .use(ConfirmationService)
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)
    .directive('tooltip', Tooltip)
    .component('AutoComplete', AutoComplete)
    .component('Avatar', Avatar)
    .component('Badge', Badge)
    .component('Button', Button)
    .component('Card', Card)
    .component('Column', Column)
    .component('ConfirmDialog', ConfirmDialog)
    .component('DataTable', DataTable)
    .component('DatePicker', DatePicker)
    .component('Dialog', Dialog)
    .component('Divider', Divider)
    .component('FloatLabel', FloatLabel)
    .component('Form', Form)
    .component('IconField', IconField)
    .component('InputIcon', InputIcon)
    .component('InputText', InputText)
    .component('Message', Message)
    .component('OverlayBadge', OverlayBadge)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Select', Select)
    .component('Skeleton', Skeleton)
    .component('Textarea', Textarea)
    .component('Toast', Toast)
    .mount('#app')