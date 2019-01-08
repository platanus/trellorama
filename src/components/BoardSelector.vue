<template>
  <div>
    <h1>Select Boards</h1>
    <v-select multiple v-model="selectedBoards" v-bind:options="boardLabels" />
    <button v-on:click="saveBoards" >Save Boards</button>
    <h2>Select a board</h2>
    <v-select v-model="selectedBoard" v-bind:options="selectedBoards" />
    <div v-if="selectedBoard !== null">
      <h3>Bug Labels</h3>
      <v-select multiple v-model="bugLabels" v-bind:options="labelOptions" />
      <h3>Lists to Show</h3>
      <v-select multiple v-model="selectedLists" v-bind:options="listLabels" />
      <h3>Work In Progress</h3>
      <v-select multiple v-model="wipLists" v-bind:options="selectedLists" />
      <h3>Include Archived</h3>
      <v-select multiple v-model="archivedLists" v-bind:options="selectedLists" />
      <h3>Backlog Lists</h3>
      <v-select multiple v-model="backlogLists" v-bind:options="selectedLists" />
      <h3>Finished List</h3>
      <v-select v-model="endList" v-bind:options="selectedLists" />
      <h3>Production List</h3>
      <v-select v-model="productionList" v-bind:options="selectedLists" />
      <h3>Configure WIP Limit</h3>
      <table>
        <thead>
          <tr>
            <th v-for="list in selectedLists" v-bind:key="list.value">
              {{ list.label }} <input type="checkbox" v-model="list.wipEnabled">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="list in selectedLists" v-bind:key="list.value">
              <input
                type="number"
                v-model="list.wip"
                :disabled="!list.wipEnabled"
              >
            </td>
          </tr>
        </tbody>
      </table>
      &ensp;
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
      wipLists: [],
      backlogLists: [],
      productionList: null,
      labelOptions: [],
      bugLabels: [],
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
      this.getBoardLabels(this.selectedBoard.value);
      this.endList = null;
      this.archivedLists = [];
      this.wipLists = [];
      this.backlogLists = [];
      this.productionList = null;
      this.labelOptions = [];
    },
    labelOptions() {
      const bugLabelsIds = get(`bugLabels_${this.selectedBoard.value}`, []);
      this.bugLabels = this.labelOptions.filter((list) => bugLabelsIds.includes(list.value));
    },
    listLabels() {
      this.selectedLists = this.retrieveList(`lists_${this.selectedBoard.value}`);
      this.archivedLists = this.retrieveList(`archived_${this.selectedBoard.value}`);
      this.wipLists = this.retrieveList(`wip_${this.selectedBoard.value}`);
      this.endList = this.retrieveValue(`end_${this.selectedBoard.value}`);
      this.backlogLists = this.retrieveList(`backlog_${this.selectedBoard.value}`);
      this.productionList = this.retrieveValue(`production_${this.selectedBoard.value}`);

      const wipLimits = get(`wipLimit_${this.selectedBoard.value}`, []);
      this.selectedLists.filter((list) =>
        wipLimits.map((wipLimit) => wipLimit.id).includes(list.value)
      ).forEach((list) => {
        list.wipEnabled = true;
        list.wip = wipLimits.find((wipLimit) => wipLimit.id === list.value).wip;
      });
    },
    selectedLists: {
      handler() {
        this.selectedLists.forEach((list) => {
          if (!list.wipEnabled) list.wip = 0;
        });
      },
      deep: true,
    },
  },
  methods: {
    retrieveValue(key) {
      const listId = get(key, null);

      return this.listLabels.find((list) => listId === list.value);
    },
    retrieveList(key) {
      const listsIds = get(key, []);

      return this.listLabels.filter((list) => listsIds.includes(list.value));
    },
    getLists(boardId) {
      const self = this;
      request(
        `boards/${boardId}/lists`,
        (response) => {
          self.listLabels = response.data.map((list) =>
            ({ label: list.name, value: list.id, wipEnabled: false, wip: 0 })
          );
          self.lists = response.data;
        },
        () => {
          onRequestError(self.getLists, [boardId]);
        }
      );
    },
    getBoardLabels(boardId) {
      const self = this;
      request(
        `boards/${boardId}/labels`,
        (response) => {
          self.labelOptions = response.data.map((label) => ({ label: label.name, value: label.id }));
        },
        () => {
          onRequestError(self.getBoardLabels, [boardId]);
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
      save(`wip_${this.selectedBoard.value}`, this.wipLists.map((list) => list.value));
      save(`backlog_${this.selectedBoard.value}`, this.backlogLists.map((list) => list.value));
      save(`production_${this.selectedBoard.value}`, this.productionList.value);
      save(
        `wipLimit_${this.selectedBoard.value}`,
        this.selectedLists.filter((list) => list.wipEnabled)
          .map((list) => ({ id: list.value, wip: list.wip }))
      );
      save(`bugLabels_${this.selectedBoard.value}`, this.bugLabels.map((list) => list.value));
    },
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #aaaaaa;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
