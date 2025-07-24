import type { App, Component } from 'vue'



// ---------------------
// Declare
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
// Types
// ---------------------

export type State = Record<string, any>;

export type CreateSSGApp = (
    component: Component,
    callback: (context: { app: App; state: State; isSSR: boolean }) => void | Promise<void>
) => Promise<((state?: State) => Promise<App>) | undefined>;