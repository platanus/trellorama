<template>
  <div id="app">
    <button v-on:click="swichSettings">Settings</button>
    <Settings v-if="seeSettings"/>
    <BoardList v-if="!seeSettings"/>
  </div>
</template>
<script>
import BoardList from './components/BoardList.vue';
import Settings from './components/Settings.vue';
import { authorize } from './utils/trelloManager.js';

/* global process */

authorize(process.env.VUE_APP_TRELLO_KEY);

export default {
  name: 'app',
  components: {
    BoardList,
    Settings,
  },
  data() {
    return {
      seeSettings: false,
    };
  },
  methods: {
    swichSettings() {
      this.seeSettings = !this.seeSettings;
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
