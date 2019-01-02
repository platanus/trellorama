<template>
  <div>
    <h1>Select Boards</h1>
    <v-select multiple v-model="selectedBoards" v-bind:options="boardLabels" />
    <button v-on:click="saveBoards" >Save Boards</button>
    <h2>Select a board</h2>
    <v-select v-model="selectedBoard" v-bind:options="selectedBoards" />
    <div v-if="selectedBoard !== null">
      <h3>Lists to Show</h3>
      <v-select multiple v-model="selectedLists" v-bind:options="listLabels" />
      <h3>Include Archived</h3>
      <v-select multiple v-model="archivedLists" v-bind:options="selectedLists" />
      <h3>Finished List</h3>
      <v-select v-model="endList" v-bind:options="selectedLists" />
      <button v-on:click="saveLists" >Save Lists</button>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { get, save } from '../utils/configurationPersistance.js';
import { request, onRequestError } from '../utils/trelloManager.js';

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
      selectedBoard: null,
      listLabels: [],
      selectedLists: [],
      archivedLists: [],
      lists: [],
      endList: null,
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
    selectedBoard() {
      this.getLists(this.selectedBoard.value);
      this.endList = null;
      this.archivedLists = [];
    },
    listLabels() {
      const selectedListsIds = get(`lists_${this.selectedBoard.value}`, []);
      this.selectedLists = this.listLabels.filter((list) => selectedListsIds.includes(list.value));

      const archivedListsIds = get(`archived_${this.selectedBoard.value}`, []);
      this.archivedLists = this.listLabels.filter((list) => archivedListsIds.includes(list.value));

      const endListId = get(`end_${this.selectedBoard.value}`, null);
      this.endList = this.listLabels.find((list) => endListId === list.value);
    },
  },
  methods: {
    getLists(boardId) {
      const self = this;
      request(
        `boards/${boardId}/lists`,
        (response) => {
          self.listLabels = response.data.map((list) => ({ label: list.name, value: list.id }));
          self.lists = response.data;
        },
        () => {
          onRequestError(self.getLists);
        }
      );
    },
    saveBoards() {
      save('boards', this.selectedBoards.map((board) => board.value));
    },
    saveLists() {
      save(`end_${this.selectedBoard.value}`, this.endList.value);
      save(`lists_${this.selectedBoard.value}`, this.selectedLists.map((list) => list.value));
      save(`archived_${this.selectedBoard.value}`, this.archivedLists.map((list) => list.value));
    },
  },
};
</script>
