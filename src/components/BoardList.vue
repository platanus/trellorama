<template>
  <div>
    <div v-for="board in boards" v-bind:key="board.id">
      <Board v-bind:board="board"/>
      <BoardInfo v-bind:boardId="board.id"/>
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import BoardInfo from './BoardInfo.vue';

export default {
  name: 'BoardList',
  components: {
    Board,
    BoardInfo,
  },
  data() {
    return {
      boards: [],
      boardIds: ['5bcf863f74837934564848be'],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.getBoards();
  },
  methods: {
    getBoards() {
      const self = this;
      window.Trello.rest('get', 'members/me/boards', (data) => {
        self.boards = data.filter((element) => self.boardIds.includes(element.id));
      }
      );
    },
  },
};
</script>
