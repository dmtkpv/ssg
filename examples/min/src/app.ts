import type { State } from '../types'
import { reactive } from 'vue'
import createApp from '@dmtkpv/ssg/createApp'
import App from './app.vue'

const defaultState: State = {
    version: 0
}

export default createApp<State>(App, (app, state = defaultState) => {
    app.provide('state', reactive(state));
})



