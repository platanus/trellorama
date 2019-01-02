<template>
  <div>
    <div v-for="board in boards" v-bind:key="board.id">
      <Board v-bind:board="board"/>
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';

export default {
  name: 'BoardList',
  components: {
    Board,
  },
  props: {
    boards: Array,
  },
};
</script>
