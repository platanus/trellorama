<template>
  <div class="landing">
    <header class="landing__header">
      <img src="../assets/trellorama-logo.svg" class="trellorama-logo">
      <p>{{ $t('landing.by') }}</p>
      <img src="../assets/platanus-logo.png" class="platanus-logo">
    </header>
    <div class="landing__body">
      <img src="../assets/landing-preview.png" class="landing__preview">
      <p class="landing__text">{{ $t('landing.body') }}</p>
      <div class="landing__authorization" v-on:click="trelloAuthorize">
        <p class="landing__authorization-text">{{ $t('landing.authorize') }}</p>
        <img src="../assets/trello-logo.png" class="trello-logo">
      </div>
    </div>
  </div>
</template>

<script>
import { authorize, manageAuth } from '../utils/trelloManager.js';
/* global process */

manageAuth(process.env.VUE_APP_TRELLO_KEY);

export default {
  name: 'LandingPage',
  methods: {
    trelloAuthorize() {
      authorize(process.env.VUE_APP_TRELLO_KEY);
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/landingPage.scss"></style>
