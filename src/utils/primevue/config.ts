import type { Plugin } from 'vue';
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import { Form } from '@primevue/forms';
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from "primevue/button"
import Card from 'primevue/card';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
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

const surface = {
    50: '{gray.50}',
    100: '{gray.100}',
    200: '{gray.200}',
    300: '{gray.300}',
    400: '{gray.400}',
    500: '{gray.500}',
    600: '{gray.600}',
    700: '{gray.700}',
    800: '{gray.800}',
    900: '{gray.900}',
    950: '{gray.950}'
};

const auraPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{zinc.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{zinc.900}',
                    activeColor: '{zinc.800}'
                },
                highlight: {
                    background: '{zinc.950}',
                    focusBackground: '{zinc.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
                surface
            },
            dark: {
                primary: {
                    color: '{zinc.50}',
                    inverseColor: '{zinc.950}',
                    hoverColor: '{zinc.100}',
                    activeColor: '{zinc.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                },
                surface
            }
        }
    }
});

const primeVuePlugin: Plugin = {
    install(app) {
        app.use(PrimeVue, {
            theme: {
                preset: auraPreset,
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
            .component('ConfirmPopup', ConfirmPopup)
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
            .component('Toast', Toast);
    }
};

export default primeVuePlugin ;