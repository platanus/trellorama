<template>
  <div>
    <h1>Select Boards</h1>
    <v-select multiple v-model="selectedBoards" v-bind:options="boardLabels" />
    <button v-on:click="save" >Save</button>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { get, save } from '../utils/configurationPersistance.js';

export default {
  name: 'BoardSelector',
  components: {
    vSelect,
  },
  props: {
    boards: Array,
  },
  data() {
    return {
      boardLabels: [],
      selectedBoards: [],
    };
  },
  mounted() {
    this.boardLabels = this.boards.map((board) => ({ label: board.name, value: board.id }));
  },
  watch: {
    boardLabels() {
      const selectedIds = get('boards', []);
      this.selectedBoards = this.boardLabels.filter((board) => selectedIds.includes(board.value));
    },
  },
  methods: {
    save() {
      save('boards', this.selectedBoards.map((board) => board.value));
    },
  },
};
</script>
