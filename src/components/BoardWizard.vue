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
      <div v-if="stage === 2" class="wizard--container wizard--container-center">
        <p class="wizard--title">Choose the Archived Lists</p>
        <p class="wizard--text">Choose the Lists you want to take their archived Cards into the metrics.</p>
        <BoardBox :id="selectedBoard" :board="selectedBoardObject" class="wizard--board-selected"/>
        <div style="width: 100%;"></div>
        <div class="wizard--container wizard--container-list wizard--container-list-alone">
          <div class="checkbox-container" v-for="list in selectedLists" :key="list.id">
            <input
              type="checkbox"
              :id="`arc_${list.id}`"
              style="display: none;"
              :value="list.id"
              v-model="archivedLists"
            >
            <label :for="`arc_${list.id}`" class="checkbox" v-on:click="generalListChangedNoDisable"></label>
            <label :for="`arc_${list.id}`" class="wizard--text-list" v-on:click="generalListChangedNoDisable">
              {{ list.name }}
            </label>
          </div>
        </div>
      </div>
      <div v-if="stage === 3" class="wizard--container wizard--container-center">
        <p class="wizard--title">Choose the Bug Labels</p>
        <p class="wizard--text">Choose the labels you use to mark bugs.</p>
        <BoardBox :id="selectedBoard" :board="selectedBoardObject" class="wizard--board-selected"/>
        <div style="width: 100%;"></div>
        <div class="wizard--container wizard--container-list wizard--container-list-alone">
          <div class="checkbox-container" v-for="label in labels" :key="label.id">
            <input
              type="checkbox"
              :id="`bugLabels_${label.id}`"
              style="display: none;"
              :value="label.id"
              v-model="bugLabels"
            >
            <label :for="`bugLabels_${label.id}`" class="checkbox" v-on:click="generalListChangedNoDisable"></label>
            <label :for="`bugLabels_${label.id}`" class="wizard--text-list" v-on:click="generalListChangedNoDisable">
              {{ label.name }}
            </label>
          </div>
        </div>
      </div>
      <div v-if="stage === 4" class="wizard--container wizard--container-center">
        <p class="wizard--title">Select the Work in Progress Limit</p>
        <p class="wizard--text">Set a limit of Cards for the Work in Progress Lists. Leave empty if no limit.</p>
        <BoardBox :id="selectedBoard" :board="selectedBoardObject" class="wizard--board-selected"/>
        <div style="width: 100%;"></div>
        <div class="wizard--container wizard--container-center wizard--container-wip">
          <div v-for="list in selectedWipLists" :key="list.id" class="wizard--wip">
            <p class="wizard--text wizard--text-normal">{{ list.name }}</p>
            <input type="number" min="0" value="null" class="wizard--wip-input" v-model="wipLimits[list.id]">
          </div>
        </div>
      </div>
      <div class="wizard--button-container">
        <button id="back_button" class="button" v-on:click="stepBack">{{ backText }}</button>
        <button id="save_button" class="button button-save button-disabled" v-on:click="saveData" disabled>
          {{ saveText }}
        </button>
        <button v-if="advancedShow" id="advanced_button" class="button" v-on:click="advancedActions">
          {{ advancedText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BoardBox from './BoardBox.vue';
import { get, save } from '../utils/configurationPersistance.js';
import { request, onRequestError } from '../utils/trelloManager.js';

const maxStageBarDifference = 2;
const stages = {
  selectBoard: 0,
  selectLists: 1,
  selectArchived: 2,
  selectBugLabels: 3,
  setWIPLimit: 4,
};

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
      labels: [],
      bugLabels: [],
      wipLimits: {},
    };
  },
  computed: {
    selectedBoardObject() {
      return this.boards.find((board) => board.id === this.selectedBoard);
    },
    selectedLists() {
      return this.allLists.filter((list) =>
        this.backlogLists
          .concat(this.wipLists)
          .concat(this.endLists)
          .concat(this.productionLists)
          .includes(list.id)
      );
    },
    advancedShow() {
      return this.stage >= stages.selectLists && this.stage < stages.setWIPLimit;
    },
    advancedText() {
      if (this.stage === stages.selectLists) return 'ADVANCED';

      return 'NEXT';
    },
    saveText() {
      if (this.stage === stages.selectBoard) return 'NEXT';

      return 'FINISH';
    },
    selectedWipLists() {
      return this.allLists.filter((list) => this.wipLists.includes(list.id));
    },
    backText() {
      if (this.stage === stages.selectBoard) return 'EXIT';

      return 'BACK';
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
    if (this.stage === stages.selectBoard && this.selectedBoard !== null) {
      document.getElementById(this.selectedBoard)
        .classList.add('wizard--board-selected');
    } else if (this.stage === stages.selectLists && this.toLoad && this.allLists.length > 0) {
      this.loadStage1();
    } else if (this.stage === stages.selectArchived && this.toLoad) {
      this.loadUpdatedListNoDisable(this.archivedLists, 'arc_', false);
      this.toLoad = false;
    } else if (this.stage === stages.selectBugLabels && this.toLoad) {
      this.loadUpdatedListNoDisable(this.bugLabels, 'bugLabels_', false);
      this.toLoad = false;
    } else if (this.stage === stages.setWIPLimit && this.toLoad) {
      this.loadWIP();
      this.toLoad = false;
    }
  },
  methods: {
    loadWIP() {
      const wipLimits = get(`wipLimit_${this.selectedBoard}`, []);
      wipLimits.forEach((wipLimit) => {
        this.$set(this.wipLimits, wipLimit.id, wipLimit.wip);
      });
    },
    loadStage1() {
      this.loadUpdatedList(this.wipLists, 'wip_', true);
      this.loadUpdatedList(this.backlogLists, 'back_', true);
      this.loadUpdatedList(this.productionLists, 'prod_', true);
      this.loadUpdatedList(this.endLists, 'end_', true);
      this.toLoad = false;
    },
    saveData() {
      if (this.stage === stages.selectBoard) {
        this.saveBoard();
      } else {
        if (this.stage === stages.selectLists) {
          this.saveSpecificLists();
        } else if (this.stage === stages.selectArchived) {
          save(`archived_${this.selectedBoard}`, this.archivedLists);
        } else if (this.stage === stages.selectBugLabels) {
          save(`bugLabels_${this.selectedBoard}`, this.bugLabels);
        } else if (this.stage === stages.setWIPLimit) {
          save(
            `wipLimit_${this.selectedBoard}`,
            Object.keys(this.wipLimits).map((listId) => ({ id: listId, wip: this.wipLimits[listId] }))
          );
        }
        this.leaveWizard();
      }
    },
    loadUpdatedList(listArray, tag) {
      let elem;
      listArray.forEach((list) => {
        elem = document.getElementById(`${tag}${list}`);
        if (elem !== null) {
          elem.parentElement.classList.toggle('checkbox-container-selected');
          this.disableOtherCheckboxes(elem.parentElement);
        }
      });
    },
    loadUpdatedListNoDisable(listArray, tag) {
      let elem;
      listArray.forEach((list) => {
        elem = document.getElementById(`${tag}${list}`);
        if (elem !== null) {
          elem.parentElement.classList.toggle('checkbox-container-selected');
        }
      });
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
    getBoardValues() {
      this.getLists(this.selectedBoard);
      this.getBoardLabels(this.selectedBoard);
      this.loadLists();
    },
    saveBoard() {
      save('boards', [this.selectedBoard]);
      this.getBoardValues();

      const progressBar = document.getElementById('progress_bar');
      this.forwardToStageBar(progressBar);

      document.getElementById('main_container').classList.toggle('wizard--container-wide');

      this.stage++;
      this.toLoad = true;
    },
    leaveWizard() {
      this.$emit('leaveWizard', true);
    },
    backToStageBar(progressBar) {
      progressBar.classList.remove(`wizard--progress-bar--step-${this.stage + maxStageBarDifference}`);
      progressBar.classList.add(`wizard--progress-bar--step-${this.stage + 1}`);
    },
    backToStage0(progressBar) {
      this.backToStageBar(progressBar);
      document.getElementById('main_container').classList.remove('wizard--container-wide');
    },
    stepBack() {
      const progressBar = document.getElementById('progress_bar');
      if (this.stage === stages.selectBoard) {
        this.leaveWizard();
      } else {
        this.stage--;
        if (this.stage === stages.selectBoard) {
          this.backToStage0(progressBar);
        } else {
          this.backToStageBar(progressBar);
        }
        this.toLoad = true;
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
    getBoardLabels(boardId) {
      const self = this;
      request(
        `boards/${boardId}/labels`,
        (response) => {
          self.labels = response.data;
        },
        () => {
          onRequestError(self.getBoardLabels, [boardId]);
        }
      );
    },
    disableOtherCheckboxes(triggerElement) {
      if (triggerElement.getAttribute('name') === undefined || triggerElement.getAttribute('name') === null) return;
      for (const element of document.getElementsByName(`${triggerElement.getAttribute('name').split('_')}`)) {
        if (element !== triggerElement) {
          element.classList.toggle('checkbox-container-disabled');
        }
      }
    },
    generalListChanged(event) {
      event.target.parentElement.classList.toggle('checkbox-container-selected');
      this.disableOtherCheckboxes(event.target.parentElement);
    },
    generalListChangedNoDisable(event) {
      event.target.parentElement.classList.toggle('checkbox-container-selected');
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
    },
    forwardToStageBar(progressBar) {
      progressBar.classList.remove(`wizard--progress-bar--step-${this.stage + 1}`);
      progressBar.classList.add(`wizard--progress-bar--step-${this.stage + maxStageBarDifference}`);
    },
    goAdvanced() {
      this.toLoad = true;
      this.stage++;
      this.archivedLists = get(`archived_${this.selectedBoard}`, []);
    },
    saveArchived() {
      this.stage++;
      save(`archived_${this.selectedBoard}`, this.archivedLists);
    },
    saveBugLabels() {
      this.stage++;
      save(`bugLabels_${this.selectedBoard}`, this.bugLabels);
    },
    advancedActions() {
      const progressBar = document.getElementById('progress_bar');
      this.forwardToStageBar(progressBar);
      if (this.stage === stages.selectLists) {
        this.saveSpecificLists();
        this.goAdvanced();
      } else if (this.stage === stages.selectArchived) {
        this.saveArchived();
        this.bugLabels = get(`bugLabels_${this.selectedBoard}`, []);
      } else if (this.stage === stages.selectBugLabels) {
        this.saveBugLabels();
      }
      this.toLoad = true;
    },
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>
