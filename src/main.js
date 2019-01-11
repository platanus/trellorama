import Vue from 'vue';
import dotenv from 'dotenv';
import App from './App.vue';
import * as Sentry from '@sentry/browser'

dotenv.config();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

Sentry.init({
  dsn: 'https://279544681984435792b43230421d4610@sentry.io/1369885',
  integrations: [new Sentry.Integrations.Vue({ Vue })]
})
