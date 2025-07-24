import { createApp, createSSRApp } from 'vue'
import type { State, CreateSSGApp } from './types'

const createSSGApp: CreateSSGApp = async function (component, callback, selector = 'body') {

    const isSSR = typeof window === 'undefined';
    const isProd = isSSR || import.meta.env.MODE === 'production';

    function getApp () {
        const app = isProd ? createSSRApp(component) : createApp(component);
        app.__selector = selector;
        return app;
    }

    async function setup (data: State) {
        const app = getApp();
        await callback?.({ app, data, isSSR });
        if (!isSSR) await app.config.globalProperties.$router?.isReady();
        return app;
    }

    if (isSSR) return setup;
    else {
        const app = await setup(window.__INITIAL_STATE__ ?? {});
        app.mount(app.__selector);
    }

}

export default createSSGApp;
