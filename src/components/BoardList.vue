<template>
  <div>
    <div v-for="board in boards" v-bind:key="board.id">
      <Board v-bind:board="board" v-if="board.id == '5bcf863f74837934564848be'"/>
      <BoardInfo v-bind:board_id="board.id" v-if="board.id == '5bcf863f74837934564848be'"/>
    </div>
  </div>
</template>

<script>
import Board from './Board.vue'
import BoardInfo from './BoardInfo.vue'


export default {
  name: 'BoardList',
  components: {
    Board,
    BoardInfo
  },
  data() {
    return {
      boards: []
    };
  },
  mounted() {
    this.get_boards();
  },
  methods: {
    get_boards() {
      const context = this;
      window.Trello.rest('get', 'members/me/boards', function (data) {
        context.boards = data;
      });
    }
  }
}
</script>