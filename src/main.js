import * as Sentry from '@sentry/browser';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import dotenv from 'dotenv';
import App from './App.vue';
import messages from './utils/localeText.js';

Vue.use(VueI18n);

/* global process */

dotenv.config();

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'es', // set fallback locale
  messages, // set locale messages
});

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app');

if (process.env.VUE_APP_ENV === 'production') {
  Sentry.init({
    dsn: 'https://25943ca63c8c40d2b5ff7b0ca2cdd437@sentry.io/1373031',
    integrations: [new Sentry.Integrations.Vue({ Vue })],
  });
}
