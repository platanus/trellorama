<template>
  <div>
    <div v-for="board in boards" v-bind:key="board.id">
      <Board v-bind:board="board" @setSettings="setSettings"/>
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
  methods: {
    setSettings() {
      this.$emit('setSettings', true);
    },
  },
};
</script>
