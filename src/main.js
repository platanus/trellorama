import * as Sentry from '@sentry/browser';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import dotenv from 'dotenv';
import App from './App.vue';
import messages from './utils/localeText.js';
import store from './store/store.js';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueI18n);

/* global process */

dotenv.config();

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: navigator.language, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});

new Vue({
  i18n,
  store,
  render: h => h(App),
}).$mount('#app');

if (process.env.VUE_APP_ENV === 'production') {
  Sentry.init({
    dsn: 'https://25943ca63c8c40d2b5ff7b0ca2cdd437@sentry.io/1373031',
    integrations: [new Sentry.Integrations.Vue({ Vue })],
  });
}
