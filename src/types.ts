import type { App, Component } from 'vue'



// ---------------------
// Declare
// ---------------------

declare global {
    interface Window {
        __INITIAL_DATA__?: unknown
    }
}

declare module 'vue' {
    interface App {
        __selector: string;
    }
}



// ---------------------
// Types
// ---------------------

export type Data = Record<string, any>;

export type CreateSSGApp = (
    component: Component,
    callback?: (context: { app: App; data: Data; isSSR: boolean }) => void | Promise<void>,
    selector?: string
) => Promise<((data: Data) => Promise<App>) | undefined>;