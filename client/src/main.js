import './assets/main.css'
import 'primeicons/primeicons.css'

import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from 'primevue/themes/aura'

const app = createApp(App)
import Select from 'primevue/select'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Badge from 'primevue/badge'
import router from '@/views/index.js'
import Card from 'primevue/card'
import Button from 'primevue/button'
import {createPinia} from 'pinia'
import Ripple from 'primevue/ripple'
import {MotionPlugin} from '@vueuse/motion'
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {definePreset} from 'primevue/themes';
import Drawer from "primevue/drawer";
import DataView from "primevue/dataview";
import Tag from "primevue/tag";


const pinia = createPinia()

const Noir = definePreset(Aura, {
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
                }
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
                }
            }
        }
    }
});
app.use(PrimeVue, {
    theme: {
        preset: Noir,
        ripple: true,
        options: {
            prefix: 'p',
            darkModeSelector: 'class',
            cssLayer: {name: 'primevue'}
        }
    }
})
app.component('VSelect', Select)
app.component('VMenubar', Menubar)
app.component('VAvatar', Avatar)
app.component('VInputText', InputText)
app.component('VDrawer', Drawer)
app.component('VInputGroup', InputGroup)
app.component('VInputGroupAddon', InputGroupAddon)
app.component('VBadge', Badge)
app.component('VCard', Card)
app.component('VButton', Button)
app.component('VDataView', DataView)
app.component('VTag', Tag)
app.directive('ripple', Ripple)
app.use(router)
app.use(pinia)
app.use(MotionPlugin)
app.mount('#app')
