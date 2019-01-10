<template>
  <div class="wizard">
    <div class="wizard--progress-bar"></div>
    <div class="wizard--progress-bar wizard--progress-bar--step-1"></div>
    <p class="wizard--title">Choose a Board</p>
    <p class="wizard--text">Choose a Trello Board and press Save.</p>
    <div class="wizard--board-container">
      <p class="wizard--text wizard--text-board-container">Boards</p>
      <div style="width: 100%;"></div>
      <BoardBox v-for="board in boards" :key="board.id" :id="board.id" :board="board" v-on:click.native="selectBoard"/>
      <div style="width: 100%;"></div>
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
    },
    leaveWizard() {
      this.$emit('leaveWizard', true);
    },
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>
