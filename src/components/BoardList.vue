<template>
  <div>
    <div v-for="board in boards" v-bind:key="board.id">
      <Board v-bind:board="board"/>
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import { request, onRequestError } from '../utils/trelloManager.js';

export default {
  name: 'BoardList',
  components: {
    Board,
  },
  data() {
    return {
      boards: [],
      boardIds: ['5bcf863f74837934564848be'],
    };
  },
  mounted() {
    this.getBoards();
  },
  methods: {
    getBoards() {
      const self = this;
      request(
        'members/me/boards',
        (response) => { self.boards = response.data.filter((element) => self.boardIds.includes(element.id)); },
        () => {
          onRequestError(self.getBoards);
        }
      );
    },
  },
};
</script>
