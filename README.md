# @dmtkpv/ssg
Static-site generator for Vue 3 on Vite, with optional integration of `vue-router` and `unhead`

## Install
```shell
npm i @dmtkpv/ssg
```
Create `build.js`
```js
import createSSG from '@dmtkpv/ssg/createSSG'
const ssg = await createSSG();
await ssg('/');
```
Add script to `package.json`
```json
{
  "scripts": {
    "build": "node build.js"
  }
}
```
Modify your main entry, e.g. `src/main.js`
```js
import createApp from '@dmtkpv/ssg/createApp'
import App from './app.vue'
export default createApp(App);
```

With `vue-router` and `unhead`
```js
import { createHead } from '@unhead/vue/client'
import createApp from '@dmtkpv/ssg/createApp'
import createRouter from '@dmtkpv/ssg/createRouter'

export default createApp(App, ({ app }) => {
    const head = createHead();
    const router = createRouter({ routes });
    app.use(head);
    app.use(router);
})
```

## Examples

[Minimal](https://github.com/dmtkpv/ssg/tree/main/examples/min)  
[Vue router and Unhead](https://github.com/dmtkpv/ssg/tree/main/examples/router)