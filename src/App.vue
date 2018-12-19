<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <BoardList/>
  </div>
</template>
<script>
import {authorize} from './trello.js'
import BoardList from './components/BoardList.vue'


authorize();

export default {
  name: 'app',
  components: {
    BoardList
  }
}
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
