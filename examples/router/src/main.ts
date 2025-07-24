import type { RouteRecordRaw } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import createApp from '@dmtkpv/ssg/createApp'
import createRouter from '@dmtkpv/ssg/createRouter'
import App from './app.vue'
import Home from './routes/home.vue'
import Info from './routes/info.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/info',
        component: Info,
    }
]

export default createApp(App, ({ app }) => {
    const head = createHead();
    const router = createRouter({ routes });
    app.use(head);
    app.use(router);
})