
/** JS */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

/** CSS */
import './assets/main.css'
import 'font-awesome/css/font-awesome.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueTheMask)
app.use(createPinia())
app.use(router)

app.mount('#app')
