<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <BoardList/>
  </div>
</template>
<script>
import BoardList from './components/BoardList.vue';
import { authorize } from './utils/trelloManager.js';

/* eslint-disable */
authorize(process.env.VUE_APP_TRELLO_KEY);
/* eslint-disable */

export default {
  name: 'app',
  components: {
    BoardList,
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
