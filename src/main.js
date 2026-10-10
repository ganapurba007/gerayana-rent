import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createUnhead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

const head = createUnhead()
app.use(head)
app.use(createPinia())
app.use(router)

app.mount('#app')

