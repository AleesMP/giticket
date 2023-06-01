import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus, faRectangleList, faPenToSquare, faUserPlus, faReceipt, faUserGear, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
library.add(faCirclePlus, faRectangleList, faPenToSquare, faUserPlus, faReceipt, faUserGear, faChevronDown, faChevronUp)

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import './style.css'

createApp(App).use(router).use(Toast, {
    transition: "Vue-Toastification__fade",
    timeout: 3000,
    position: 'bottom-center'
}).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
