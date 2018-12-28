<template>
  <div id="app">
    <BoardSelector @changed="selectBoards"/>
    <BoardList v-bind:boards="boards"/>
  </div>
</template>
<script>
import BoardList from './components/BoardList.vue';
import BoardSelector from './components/BoardSelector.vue';
import { authorize } from './utils/trelloManager.js';

/* global process */

authorize(process.env.VUE_APP_TRELLO_KEY);

export default {
  name: 'app',
  components: {
    BoardList,
    BoardSelector,
  },
  data() {
    return {
      boards: [],
    };
  },
  methods: {
    selectBoards(value) {
      this.boards = value;
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
