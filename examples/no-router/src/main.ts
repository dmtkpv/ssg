import { reactive } from 'vue'
import createApp from '@dmtkpv/ssg/createApp'
import App from './app.vue'

export default createApp(App, ({ app, data, isSSR }) => {

    const state = reactive(data);

    function setKey () {
        state.key = location.pathname.slice(1);
    }

    if (!isSSR) {
        window.addEventListener('popstate', setKey);
        setKey();
    }

    app.provide('state', state);

});




