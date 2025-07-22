import { join } from 'path'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolveConfig, build } from 'vite'
import { renderToString } from 'vue/server-renderer'
import { JSDOM } from 'jsdom'
import type { State } from './types'

export default async function () {

    process.env.NODE_ENV = 'production';



    // ---------------------
    // Config
    // ---------------------

    const filename = 'ssr-bundle.js';
    const config = await resolveConfig({}, 'build', 'production');
    const dist = join(config.root, config.build.outDir);



    // ---------------------
    // Get entry
    // ---------------------

    function getEntry () {
        const path = join(config.root, 'index.html');
        const template = readFileSync(path, 'utf8');
        const index = template.lastIndexOf('script type="module"');
        const matches = template.slice(index).match(/src="(.*)">/);
        return matches?.[1] || 'src/main'
    }



    // ---------------------
    // Build
    // ---------------------

    await build();
    await build({
        build: {
            ssr: getEntry(),
            copyPublicDir: false,
            emptyOutDir: false,
            rollupOptions: {
                output: {
                    entryFileNames: filename,
                }
            }
        },
    });



    // ---------------------
    // Bundles
    // ---------------------

    const bundle = await import(join(dist, filename));
    const template = readFileSync(join(dist, 'index.html'), 'utf8');



    // ---------------------
    // Exports
    // ---------------------

    return async function (path: string, state: State) {

        const app = await bundle.default(state);
        const html = await renderToString(app);
        const dom = new JSDOM(template);
        const doc = dom.window.document;

        const script = doc.createElement('script');
        script.textContent = `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`;
        doc.head.append(script);

        const root = doc.querySelector(app.__selector);
        root.innerHTML = html + root.innerHTML

        const dir = join(dist, path);

        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, 'index.html'), dom.serialize());

    }



}

