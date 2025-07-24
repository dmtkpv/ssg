import { createApp, createSSRApp } from 'vue'
import type { App, ComponentPublicInstance } from 'vue'
import type { State, CreateSSGApp } from './types'

const createSSGApp: CreateSSGApp = async function (component, callback) {

    const isSSR = typeof window === 'undefined';
    const isProd = import.meta.env.MODE === 'production';

    function ssrMount (this: App, selector: string) {
        this.__selector = selector;
        return {} as ComponentPublicInstance;
    }

    function getApp () {
        const app = isProd ? createSSRApp(component) : createApp(component);
        if (isSSR) app.mount = ssrMount;
        return app;
    }

    function getState (state: State) {
        if (isSSR) return state;
        return window.__INITIAL_STATE__ as State;
    }

    async function setup (_state: State = {}) {
        const app = getApp();
        const state = getState(_state);
        await callback?.({ app, state, isSSR });
        await app.config.globalProperties.$router?.isReady();
        return app;
    }

    if (isSSR) return setup;
    else await setup();

}

export default createSSGApp;
