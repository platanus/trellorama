<template>
  <div>
    <h3>{{ list.name }} ({{cards.length}}/{{WIPLimit}})</h3>
    <div class="container">
      <Card v-for="card in sortedCards" :key="card.id" v-bind:card="card" v-bind:warning="warning"/>
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
  },
  components: {
    Card,
  },
  computed: {
    sortedCards() {
      return this.cards.slice().sort((a, b) => moment(a.dateLastActivity) - moment(b.dateLastActivity));
    },
    warning() {
      return this.cards.length > this.WIPLimit;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
