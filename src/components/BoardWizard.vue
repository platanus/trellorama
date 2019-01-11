<template>
  <div class="wizard">
    <div class="wizard--progress-bar"></div>
    <div class="wizard--progress-bar wizard--progress-bar--step-1" id="progress_bar"></div>
    <div id="main_container" class="wizard--container">
      <div v-if="stage === 0" class="wizard--container wizard--container-inner">
        <p class="wizard--title">Choose a Board</p>
        <p class="wizard--text">Choose a Trello Board and press Next.</p>
        <p class="wizard--text wizard--text-board-container">Boards</p>
        <div style="width: 100%;"></div>
        <BoardBox
          v-for="board in boards"
          :key="board.id"
          :id="board.id"
          :board="board"
          v-on:click.native="selectBoard"
        />
        <div style="width: 100%;"></div>
      </div>
      <div v-if="stage === 1" class="wizard--container wizard--container-center">
        <p class="wizard--title">Choose the Lists</p>
        <p class="wizard--text">Choose the Lists you want to see for your Board.</p>
        <p class="wizard--text">Board</p>
        <BoardBox :id="selectedBoard" :board="selectedBoardObject" class="wizard--board-selected"/>
        <div style="width: 100%;"></div>
        <div class="wizard--container wizard--container-list">
          <div class="checkbox-container" v-for="list in allLists" :key="list.id">
            <input
              type="checkbox"
              :id="`selec_${list.id}`"
              style="display: none;"
              :value="list.id"
              v-model="selectedLists"
            >
            <label :for="`selec_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
            <label :for="`selec_${list.id}`" class="wizard--text-list">{{ list.name }}</label>
          </div>
        </div>
      </div>
      <div v-if="stage === 2" class="wizard--container wizard--container-center">
        <p class="wizard--title">Classify the Lists</p>
        <p class="wizard--text">Add the Lists to their respective categories.</p>
        <p class="wizard--text">Board</p>
        <BoardBox :id="selectedBoard" :board="selectedBoardObject" class="wizard--board-selected"/>
        <div style="width: 100%;"></div>
        <div>
          <p class="wizard--text">Backlog</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in selectedListsObjects" :key="list.id">
              <input
                type="radio"
                :id="`back_${list.id}`"
                style="display: none;"
                :value="list.id"
                v-model="backlogList"
              >
              <label :for="`back_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`back_${list.id}`" class="wizard--text-list">{{ list.name }}</label>
            </div>
          </div>
        </div>
        <div>
          <p class="wizard--text">Work In Progress</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in selectedListsObjects" :key="list.id">
              <input type="checkbox" :id="`wip_${list.id}`" style="display: none;" :value="list.id" v-model="wipLists">
              <label :for="`wip_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`wip_${list.id}`" class="wizard--text-list">{{ list.name }}</label>
            </div>
          </div>
        </div>
        <div>
          <p class="wizard--text">Finished</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in selectedListsObjects" :key="list.id">
              <input type="radio" :id="`end_${list.id}`" style="display: none;" :value="list.id" v-model="endList">
              <label :for="`end_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`end_${list.id}`" class="wizard--text-list">{{ list.name }}</label>
            </div>
          </div>
        </div>
        <div>
          <p class="wizard--text">Production</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in selectedListsObjects" :key="list.id">
              <input
                type="radio"
                :id="`prod_${list.id}`"
                style="display: none;"
                :value="list.id"
                v-model="productionList"
              >
              <label :for="`prod_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`prod_${list.id}`" class="wizard--text-list">{{ list.name }}</label>
            </div>
          </div>
        </div>
        <div>
          <p class="wizard--text">Archived</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in selectedListsObjects" :key="list.id">
              <input
                type="checkbox"
                :id="`arc_${list.id}`"
                style="display: none;"
                :value="list.id"
                v-model="archivedLists"
              >
              <label :for="`arc_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`arc_${list.id}`" class="wizard--text-list">{{ list.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="wizard--button-container">
        <button class="button" v-on:click="leaveWizard">SKIP</button>
        <button id="save_button" class="button button-save" v-on:click="saveData">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import BoardBox from './BoardBox.vue';
import { get, save } from '../utils/configurationPersistance.js';
import { request, onRequestError } from '../utils/trelloManager.js';

export default {
  name: 'BoardWizzard',
  props: {
    boards: Array,
  },
  components: {
    BoardBox,
  },
  data() {
    return {
      selectedBoard: null,
      stage: 0,
      allLists: [],
      selectedLists: [],
      archivedLists: [],
      endList: null,
      wipLists: [],
      backlogList: null,
      productionList: null,
      toLoad: true,
    };
  },
  computed: {
    selectedBoardObject() {
      return this.boards.find((board) => board.id === this.selectedBoard);
    },
    selectedListsObjects() {
      return this.allLists.filter((list) => this.selectedLists.includes(list.id));
    },
  },
  mounted() {
    this.selectedBoard = get('boards', null)[0];
    if (this.selectedBoard !== null) {
      document.getElementById(this.selectedBoard)
        .classList.toggle('wizard--board-selected');
    }
  },
  updated() {
    if (this.stage === 1 && this.toLoad === true) {
      console.log('IN');
      this.selectedLists.forEach((list) => {
        const elem = document.getElementById(`selec_${list}`);
        console.log(elem);
        if (elem != null) elem.parentElement.classList.toggle('checkbox-container-selected');
      });
      this.toLoad = false;
    } else if (this.stage === 2 && this.toLoad) {
      this.wipLists.forEach((list) =>
        document.getElementById(`wip_${list}`).parentElement.classList.toggle('checkbox-container-selected')
      );
      this.archivedLists.forEach((list) =>
        document.getElementById(`arc_${list}`).parentElement.classList.toggle('checkbox-container-selected')
      );
      document.getElementById(`back_${this.backlogList}`)
        .parentElement.classList.toggle('checkbox-container-selected');
      document.getElementById(`end_${this.endList}`)
        .parentElement.classList.toggle('checkbox-container-selected');
      document.getElementById(`prod_${this.productionList}`)
        .parentElement.classList.toggle('checkbox-container-selected');
      this.toLoad = false;
    }
  },
  methods: {
    saveData() {
      if (this.stage === 0) {
        this.saveBoard();
      } else if (this.stage === 1) {
        this.saveAllLists();
      } else {
        this.saveSpecificLists();
      }
    },
    selectBoard(event) {
      let element = event.target;
      if (element.tagName === 'P') element = event.target.parentElement;
      for (const elem of document.getElementsByClassName('wizard--board-selected')) {
        elem.classList.toggle('wizard--board-selected');
      }
      element.classList.toggle('wizard--board-selected');
      this.selectedBoard = element.id;
    },
    saveBoard() {
      save('boards', [this.selectedBoard]);
      this.getLists(this.selectedBoard);
      this.selectedLists = get(`lists_${this.selectedBoard}`, []);

      const progressBar = document.getElementById('progress_bar');
      progressBar.classList.remove('wizard--progress-bar--step-1');
      progressBar.classList.add('wizard--progress-bar--step-2');

      this.stage++;
      this.toLoad = true;
    },
    leaveWizard() {
      this.$emit('leaveWizard', true);
    },
    loadLists() {
      this.archivedLists = get(`archived_${this.selectedBoard}`, []);
      this.wipLists = get(`wip_${this.selectedBoard}`, []);
      this.endList = get(`end_${this.selectedBoard}`, null);
      this.backlogList = get(`backlog_${this.selectedBoard}`, null);
      this.productionList = get(`production_${this.selectedBoard}`, null);
    },
    saveAllLists() {
      save(`lists_${this.selectedBoard}`, this.selectedLists);
      this.loadLists();

      const progressBar = document.getElementById('progress_bar');
      progressBar.classList.remove('wizard--progress-bar--step-2');
      progressBar.classList.add('wizard--progress-bar--step-3');

      document.getElementById('main_container').classList.toggle('wizard--container-wide');
      document.getElementById('save_button').innerHTML = 'FINISH';

      this.stage++;
      this.toLoad = true;
    },
    getLists(boardId) {
      const self = this;
      request(
        `boards/${boardId}/lists`,
        (response) => {
          self.allLists = response.data;
        },
        () => {
          onRequestError(self.getLists, [boardId]);
        }
      );
    },
    generalListChanged(event) {
      event.target.parentElement.classList.toggle('checkbox-container-selected');
    },
    saveSpecificLists() {
      save(`archived_${this.selectedBoard}`, this.archivedLists);
      save(`wip_${this.selectedBoard}`, this.wipLists);
      save(`end_${this.selectedBoard}`, this.endList);
      save(`backlog_${this.selectedBoard}`, this.backlogList);
      save(`production_${this.selectedBoard}`, this.productionList);
      this.leaveWizard();
    },
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>
