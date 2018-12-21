<template>
  <div>
    <div v-for="board in boards" v-bind:key="board.id">
      <Board v-bind:board="board"/>
      <BoardInfo
        v-bind:boardId="board.id"
        v-bind:listIds="listIdsByBoard[board.id]"
      />
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import BoardInfo from './BoardInfo.vue';
import { request, onRequestError } from '../utils/trelloManager.js';

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
      listIdsByBoard: {
        '5bcf863f74837934564848be': [
          '5bcf863f74837934564848c2',
          '5bcf863f74837934564848c3',
          '5bcf863f74837934564848c4',
          '5bcf863f74837934564848c5',
          '5bcf863f74837934564848c6',
          '5bcf863f74837934564848c7',
          '5bcf863f74837934564848c8',
        ],
      },
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
        (error) => {
          console.log(error);
          onRequestError(self.getBoards);
        }
      );
    },
  },
};
</script>
