import type { RouterOptions } from 'vue-router';
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

export default function (options: RouterOptions, base?: string) {
    const isSSR = typeof window === 'undefined';
    const history = isSSR ? createMemoryHistory(base) : createWebHistory(base);
    return createRouter({ ...options, history });
}