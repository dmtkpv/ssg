import type { State } from '../types'
import type { RouteRecordRaw } from 'vue-router'
import { reactive } from 'vue'
import { createHead } from '@unhead/vue/client'
import createApp from '@dmtkpv/ssg/createApp'
import createRouter from '@dmtkpv/ssg/createRouter'
import App from './app.vue'
import Home from './routes/home.vue'
import Info from './routes/info.vue'

const defaultState: State = {
    version: 0
}

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

export default createApp<State>(App, (app, state = defaultState) => {
    const head = createHead();
    const router = createRouter({ routes });
    app.use(head);
    app.use(router);
    app.provide('state', reactive(state));
})



