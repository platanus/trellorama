<template>
  <div>
    <h3>{{ list.name }}</h3>
    <div class="container">
      <Card v-for="card in sortedCards" :key="card.id" v-bind:card="card"/>
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
  },
  components: {
    Card,
  },
  computed: {
    sortedCards() {
      return this.cards.slice().sort((a, b) => moment(a.dateLastActivity) - moment(b.dateLastActivity));
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
