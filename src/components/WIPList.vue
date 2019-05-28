<template>
  <div :class="listClass">
    <div class="list-header">
      <p>{{ list.name }}</p>
      <p :class="numberClass" v-if="Number.isInteger(WIPLimit)">{{cards.length}}/{{WIPLimit}}</p>
    </div>
    <div>
      <Card
        v-for="card in sortedCards"
        v-bind:key="card.id"
        v-bind:card="card"
        v-bind:days="timeInList(card.id).toLocaleString({maximumFractionDigits: 2})"
        v-bind:average="averageTime"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Card from './Card.vue';

export default {
  name: 'WIPList',
  props: {
    list: Object,
    cards: Array,
    WIPLimit: Number,
    activities: Array,
    averageTime: Number,
  },
  components: {
    Card,
  },
  computed: {
    sortedCards() {
      return this.cards.slice().sort((a, b) => this.timeInList(b.id) - this.timeInList(a.id));
    },
    warning() {
      if (this.WIPLimit === null) return false;

      return this.cards.length > this.WIPLimit;
    },
    listClass() {
      return {
        'wip-list': true,
        'wip-list--warning': this.warning,
      };
    },
    numberClass() {
      return {
        'list-number--warning': this.warning,
      };
    },
  },
  methods: {
    cardActivities(cardId) {
      return this.activities
        .filter((activity) => activity.data.card.id === cardId);
    },
    timeInList(cardId) {
      const activity = this.cardActivities(cardId).slice()
        .sort((filteredActivity1, filteredActivity2) =>
          moment(filteredActivity2).diff(filteredActivity1, 'seconds', true)
        )[0];

      return activity === undefined ? 0 : moment().diff(activity.date, 'days', true);
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/wipList.scss"></style>
