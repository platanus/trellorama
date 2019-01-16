import * as Sentry from '@sentry/browser'
import Vue from 'vue';
import dotenv from 'dotenv';
import App from './App.vue';

/* global process */

dotenv.config();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

if (process.env.VUE_APP_ENV === 'production') {
  Sentry.init({
    dsn: 'https://25943ca63c8c40d2b5ff7b0ca2cdd437@sentry.io/1373031',
    integrations: [new Sentry.Integrations.Vue({ Vue })],
  });
}
