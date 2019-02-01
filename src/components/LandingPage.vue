<template>
  <div class="landing">
    <img src="../assets/Platanus.png" class="logo-box">
    <div class="trello" v-on:click="trelloAuthorize"><img src="../assets/trello-logo.png" class="trello__logo"></div>
    <p align="left" class="landing__text">{{ $t('landing.body') }}</p>
    <div class="landing__oval"></div>
    <div class="landing__rectangle"></div>
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
