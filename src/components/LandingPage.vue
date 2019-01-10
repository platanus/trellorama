<template>
  <div class="landing">
    <img src="../assets/Platanus.png" class="logo-box">
    <div class="trello" v-on:click="trelloAuthorize"><img src="../assets/trello-logo.png" class="trello-logo"></div>
    <p align="left" class="landing-text">Denme mis malditas métricas de proyecto</p>
    <div class="landing-oval"></div>
    <div class="landing-rectangle"></div>
  </div>
</template>

<script>
import { authorize } from '../utils/trelloManager.js';
/* global process */

export default {
  name: 'LandingPage',
  methods: {
    trelloAuthorize() {
      authorize(process.env.VUE_APP_TRELLO_KEY);
    },
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>
