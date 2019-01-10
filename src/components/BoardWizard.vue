<template>
  <div class="wizard">
    <div class="wizard--progress-bar"></div>
    <div class="wizard--progress-bar wizard--progress-bar--step-1" id="progress_bar"></div>
    <div class="wizard--container">
      <div v-if="stage === 0" class="wizard--container wizard--container-inner">
        <p class="wizard--title">Choose a Board</p>
        <p class="wizard--text">Choose a Trello Board and press Save.</p>
        <p class="wizard--text wizard--text-board-container">Boards</p>
        <div style="width: 100%;"></div>
        <BoardBox v-for="board in boards" :key="board.id" :id="board.id" :board="board" v-on:click.native="selectBoard"/>
        <div style="width: 100%;"></div>
      </div>
      <div class="wizard--button-container">
        <button class="button" v-on:click="leaveWizard">SKIP</button>
        <button class="button button-save" v-on:click="saveBoard">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import BoardBox from './BoardBox.vue';
import { get, save } from '../utils/configurationPersistance.js';

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
    };
  },
  mounted() {
    this.selectedBoard = get('boards', null);
    if (this.selectedBoard !== null) {
      document.getElementById(this.selectedBoard)
        .classList.toggle('wizard--board-selected');
    }
  },
  methods: {
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

      const progressBar = document.getElementById('progress_bar');
      progressBar.classList.remove('wizard--progress-bar--step-1');
      progressBar.classList.add('wizard--progress-bar--step-2');

      this.stage++;
    },
    leaveWizard() {
      this.$emit('leaveWizard', true);
    },
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>
