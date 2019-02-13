<template>
  <div class="objectives-container">
    <p>{{ $t('objectivePercentage.title') }}</p>
    <div v-for="label in objectiveLabels" :key="label.value" class="objective">
      <div
        :style="{ backgroundColor: getTrelloLabelColor(label.color) }" class="trello-label">
      </div>
      {{ label.label }}: {{ percentage(label.value) }}%
    </div>
  </div>
</template>

<script>
import { get } from '../utils/configurationPersistance.js';

const percentageNumber = 100;
const sortValue = 1;

export default {
  name: 'objectivePercentage',
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    boardId: String,
    endListIds: Array,
    productionListIds: Array,
  },
  data() {
    return {
      objectiveLabels: [],
    };
  },
  mounted() {
    const labels = get(`objectiveLabels_${this.boardId}`, []);
    this.objectiveLabels = this.allLabels.filter((label) => labels.includes(label.value));
    this.objectiveLabels = this.objectiveLabels.sort((a, b) => {
      if (a.label.toLowerCase() < b.label.toLowerCase()) return -sortValue;
      if (a.label.toLowerCase() > b.label.toLowerCase()) return sortValue;

      return 0;
    });
  },
  computed: {
    allLabels() {
      return this.$store.state.labels;
    },
  },
  methods: {
    usefulCards(labelId) {
      return this.cards.filter((card) => card.idLabels.some((label) => label === labelId));
    },
    percentage(labelId) {
      const usefulCards = this.usefulCards(labelId);
      if (usefulCards.length === 0) return 0;

      return parseInt((usefulCards.filter((card) =>
        this.endListIds.concat(this.productionListIds).includes(card.idList)
      ).length / usefulCards.length) * percentageNumber, 10);
    },
    getTrelloLabelColor(colorName) {
      const colors = {
        blue: '#0079BF',
        green: '#61BD4F',
        orange: '#FFAB4A',
        red: '#EB5A46',
        yellow: '#F2D600',
        purple: '#C377E0',
        pink: '#FF80CE',
        sky: '#E4F7FA',
        lime: '#51E898',
        shades: '#838C91',
        black: '#000000',
        null: 'transparent',
      };

      return colors[colorName];
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/objectivePercentage.scss"></style>
