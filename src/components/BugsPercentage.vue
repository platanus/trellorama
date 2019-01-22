<template>
  <div>
    <p class="dashboard--number">{{ percentage }}%</p>
    <p class="dashboard--text">Of cards are Bugs</p>
  </div>
</template>

<script>
import { get } from '../utils/configurationPersistance.js';

const percent = 100;

export default {
  name: 'BugsPercentage',
  props: {
    cards: Array,
    boardId: String,
  },
  data() {
    return {
      bugLabels: [],
    };
  },
  mounted() {
    this.bugLabels = get(`bugLabels_${this.boardId}`, []);
  },
  computed: {
    percentage() {
      if (this.cards === []) return '0';

      return (this.cards.filter((card) =>
        card.labels.map((element) => element.id).some((label) => this.bugLabels.includes(label))
      ).length / this.cards.filter((card) =>
        card.labels.map((element) => element.id).some((label) => !this.bugLabels.includes(label))
      ).length * percent).toFixed(1);
    },
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>
