import { createApp, createSSRApp } from 'vue'
import type { App, Component } from 'vue'



// ---------------------
// Types
// ---------------------

declare global {
    interface Window {
        __INITIAL_STATE__?: unknown
    }
}

declare module 'vue' {
    interface App {
        __selector: string;
    }
}



// ---------------------
// Exports
// ---------------------

export default async function <S> (
    component: Component,
    callback?: (app: App, state?: S) => void,
    selector: string = 'body'
) {

    const isSSR = typeof window === 'undefined';
    const isProd = import.meta.env.MODE === 'production';

    if (!isProd) {
        const app = createApp(component);
        callback?.(app);
        app.mount(selector);
    }

    else if (!isSSR) {
        const app = createSSRApp(component);
        callback?.(app, window.__INITIAL_STATE__ as S);
        await app.config.globalProperties.$router?.isReady();
        app.mount(selector);
    }

    else return (state: S) => {
        const app = createSSRApp(component);
        app.__selector = selector
        callback?.(app, state);
        return app;
    }

}