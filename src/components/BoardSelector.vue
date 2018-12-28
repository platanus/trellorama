<template>
  <div>
    <h1>Select Boards</h1>
    <v-select multiple v-model="selectedBoards" v-bind:options="boardLabels" />
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { request, onRequestError } from '../utils/trelloManager.js';
import { get, save } from '../utils/configurationPersistance.js';

export default {
  name: 'BoardSelector',
  components: {
    vSelect,
  },
  data() {
    return {
      boardLabels: [],
      selectedBoards: get('boards', []),
      boards: [],
    };
  },
  mounted() {
    this.getBoards();
  },
  watch: {
    selectedBoards() {
      save('boards', this.selectedBoards);
      this.sendBoards();
    },
  },
  methods: {
    getBoards() {
      const self = this;
      request(
        'members/me/boards',
        (response) => {
          self.boardLabels = response.data.map((board) => ({ label: board.name, value: board.id }));
          self.boards = response.data;
          self.sendBoards();
        },
        () => {
          onRequestError(self.getBoards);
        }
      );
    },
    sendBoards() {
      this.$emit('changed', this.boards.filter((board) => this.selectedBoards.map((sBoard) => sBoard.value).includes(board.id)));
    },
  },
};
</script>
