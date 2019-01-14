<template>
  <div class="wizard">
    <div class="wizard--progress-bar"></div>
    <div class="wizard--progress-bar wizard--progress-bar--step-1" id="progress_bar"></div>
    <div id="main_container" class="wizard--container">
      <div v-if="stage === 0" class="wizard--container wizard--container-inner">
        <p class="wizard--title">Choose a Board</p>
        <p class="wizard--text">Choose a Trello Board and press Next.</p>
        <div class="wizard--container wizard--container-board">
          <BoardBox
            v-for="board in boards"
            :key="board.id"
            :id="board.id"
            :board="board"
            v-on:click.native="selectBoard"
          />
        </div>
        <div style="width: 100%;"></div>
      </div>
      <div v-if="stage === 1" class="wizard--container wizard--container-center">
        <p class="wizard--title">Classify the Lists</p>
        <p class="wizard--text">Add the Lists to their respective categories.</p>
        <BoardBox :id="selectedBoard" :board="selectedBoardObject" class="wizard--board-selected"/>
        <div style="width: 100%;"></div>
        <div class="wizard--container-list-container">
          <p class="wizard--text">Backlog</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in allLists" :key="list.id" :name="`cont-${list.id}`">
              <input
                type="checkbox"
                :id="`back_${list.id}`"
                style="display: none;"
                :value="list.id"
                v-model="backlogLists"
              >
              <label :for="`back_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`back_${list.id}`" class="wizard--text-list" v-on:click="generalListChanged">
                {{ list.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="wizard--container-list-container">
          <p class="wizard--text">Work In Progress</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in allLists" :key="list.id" :name="`cont-${list.id}`">
              <input type="checkbox" :id="`wip_${list.id}`" style="display: none;" :value="list.id" v-model="wipLists" >
              <label :for="`wip_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`wip_${list.id}`" class="wizard--text-list" v-on:click="generalListChanged">
                {{ list.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="wizard--container-list-container">
          <p class="wizard--text">Finished</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in allLists" :key="list.id" :name="`cont-${list.id}`">
              <input type="checkbox" :id="`end_${list.id}`" style="display: none;" :value="list.id" v-model="endLists">
              <label :for="`end_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`end_${list.id}`" class="wizard--text-list" v-on:click="generalListChanged">
                {{ list.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="wizard--container-list-container">
          <p class="wizard--text">Production</p>
          <div class="wizard--container wizard--container-list wizard--container-list-special">
            <div class="checkbox-container" v-for="list in allLists" :key="list.id" :name="`cont-${list.id}`">
              <input
                type="checkbox"
                :id="`prod_${list.id}`"
                style="display: none;"
                :value="list.id"
                v-model="productionLists"
              >
              <label :for="`prod_${list.id}`" class="checkbox" v-on:click="generalListChanged"></label>
              <label :for="`prod_${list.id}`" class="wizard--text-list" v-on:click="generalListChanged">
                {{ list.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="wizard--button-container">
        <button id="back_button" class="button button-disabled" v-on:click="stepBack" disabled>BACK</button>
        <button id="save_button" class="button button-save button-disabled" v-on:click="saveData" disabled>NEXT</button>
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
      archivedLists: [],
      endLists: [],
      wipLists: [],
      backlogLists: [],
      productionLists: [],
      toLoad: true,
    };
  },
  computed: {
    selectedBoardObject() {
      return this.boards.find((board) => board.id === this.selectedBoard);
    },
  },
  mounted() {
    this.selectedBoard = get('boards', null);
    if (this.selectedBoard !== null) {
      this.selectedBoard = this.selectedBoard[0];
      document.getElementById(this.selectedBoard)
        .classList.toggle('wizard--board-selected');
      document.getElementById('save_button').classList.remove('button-disabled');
      document.getElementById('save_button').disabled = false;
    }
  },
  updated() {
    let elem;
    if (this.stage === 0 && this.selectedBoard !== null) {
      document.getElementById(this.selectedBoard)
        .classList.add('wizard--board-selected');
    } else if (this.stage === 1 && this.toLoad && this.allLists.length > 0) {
      this.wipLists.forEach((list) => {
        elem = document.getElementById(`wip_${list}`);
        if (elem !== null) {
          elem.parentElement.classList.toggle('checkbox-container-selected');
          this.disableOtherCheckboxes(elem.parentElement);
        }
      });
      this.backlogLists.forEach((list) => {
        elem = document.getElementById(`back_${list}`);
        if (elem !== null) {
          elem.parentElement.classList.toggle('checkbox-container-selected');
          this.disableOtherCheckboxes(elem.parentElement);
        }
      });
      this.productionLists.forEach((list) => {
        elem = document.getElementById(`prod_${list}`);
        if (elem !== null) {
          elem.parentElement.classList.toggle('checkbox-container-selected');
          this.disableOtherCheckboxes(elem.parentElement);
        }
      });
      this.endLists.forEach((list) => {
        elem = document.getElementById(`end_${list}`);
        if (elem !== null) {
          elem.parentElement.classList.toggle('checkbox-container-selected');
          this.disableOtherCheckboxes(elem.parentElement);
        }
      });
      this.toLoad = false;
    }
  },
  methods: {
    saveData() {
      if (this.stage === 0) {
        this.saveBoard();
        document.getElementById('back_button').classList.remove('button-disabled');
        document.getElementById('back_button').disabled = false;
      } else if (this.stage === 1) {
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
      document.getElementById('save_button').classList.remove('button-disabled');
      document.getElementById('save_button').disabled = false;
    },
    saveBoard() {
      save('boards', [this.selectedBoard]);
      this.getLists(this.selectedBoard);
      this.loadLists();

      const progressBar = document.getElementById('progress_bar');
      progressBar.classList.remove('wizard--progress-bar--step-1');
      progressBar.classList.add('wizard--progress-bar--step-2');

      document.getElementById('main_container').classList.toggle('wizard--container-wide');
      document.getElementById('save_button').innerHTML = 'FINISH';

      this.stage++;
      this.toLoad = true;
    },
    leaveWizard() {
      this.$emit('leaveWizard', true);
    },
    stepBack(){
      const progressBar = document.getElementById('progress_bar');
      if (this.stage > 0) {
        this.stage--;
        if (this.stage === 0) {
          progressBar.classList.remove('wizard--progress-bar--step-2');
          progressBar.classList.add('wizard--progress-bar--step-1');
          document.getElementById('back_button').classList.add('button-disabled');
          document.getElementById('back_button').disabled = true;
          document.getElementById('main_container').classList.remove('wizard--container-wide');
          document.getElementById('save_button').innerHTML = 'NEXT';
          this.toLoad = true;
        } /*else if (this.stage === 1) {
          progressBar.classList.remove('wizard--progress-bar--step-3');
          progressBar.classList.add('wizard--progress-bar--step-2');

          document.getElementById('main_container').classList.remove('wizard--container-wide');
          document.getElementById('save_button').innerHTML = 'NEXT';
          this.toLoad = true;
        }*/
      }
    },
    loadLists() {
      this.wipLists = get(`wip_${this.selectedBoard}`, []);
      this.endLists = get(`end_${this.selectedBoard}`, []);
      this.backlogLists = get(`backlog_${this.selectedBoard}`, []);
      this.productionLists = get(`production_${this.selectedBoard}`, []);
      if (!Array.isArray(this.backlogLists)) this.backlogLists = [this.backlogLists];
      if (!Array.isArray(this.endLists)) this.endLists = [this.endLists];
      if (!Array.isArray(this.productionLists)) this.productionLists = [this.productionLists];
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
    disableOtherCheckboxes(triggerElement) {
      for (const element of document.getElementsByName(`${triggerElement.getAttribute('name').split('_')}`)) {
        if (element !== triggerElement) {
          element.classList.toggle('checkbox-container-disabled');
        }
      }
    },
    generalListChanged(event) {
      event.target.parentElement.classList.toggle('checkbox-container-selected');
      this.disableOtherCheckboxes(event.target.parentElement)
    },
    radioListChanged(event) {
      for (const elem of event.target.parentElement.parentElement.children) {
        if (elem.classList.contains('checkbox-container-selected')) {
          elem.classList.remove('checkbox-container-selected');
        }
      }
      event.target.parentElement.classList.toggle('checkbox-container-selected');
    },
    saveSpecificLists() {
      save(`wip_${this.selectedBoard}`, this.wipLists);
      save(`end_${this.selectedBoard}`, this.endLists);
      save(`backlog_${this.selectedBoard}`, this.backlogLists);
      save(`production_${this.selectedBoard}`, this.productionLists);
      save(`lists_${this.selectedBoard}`, this.backlogLists
        .concat(this.wipLists)
        .concat(this.endLists)
        .concat(this.productionLists));
      this.leaveWizard();
    },
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>
