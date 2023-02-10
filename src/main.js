import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/styles.scss'
import directives from './directives'


const app = createApp(App).use(store).use(router)
directives(app);
app.mount('#app')
