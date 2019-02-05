<template>
  <div class="dashboard__single-item-container">
    <h3 class="dashboard__text dashboard__subsection-title">{{ $t('wipHistogram.title') }}</h3>
    <div class="dashboard__content-options">
      <b>{{ $t('chart.options') }}:</b>
      &ensp;
      <label for="histListSelector">{{ $t('wipHistogram.selectList') }}: </label>
      <select v-model="selectedList" id="histListSelector">
        <option v-for="list in wipLists" :key="list.id" :value="list.id">{{ list.name }}</option>
      </select>
      <div>
        &ensp;
        <label for="binWidth">{{$t('wipHistogram.binWidth') }}: </label>
        <input type="number" id="binWidth" v-model="binWidth">
      </div>
    </div>
    <WipHistogram
      :binWidth="binWidth"
      :listTimes="listTimes()"
      @selectedBin="selectedBin"
    />
    <div class="dashboard__wip-histogram-cards">
      <Card
        v-for="selectedCard in selectedCards"
        v-bind:key="selectedCard.card.id"
        v-bind:card="selectedCard.card"
        v-bind:days="selectedCard.time.toString()"
        v-bind:average="average"
        v-bind:allLabels="allLabels"
        :allMembers="allMembers"
      />
    </div>
  </div>
</template>

<script>
import WipHistogram from './WipHistogram.vue';
import { getListCards, getTimes } from '../utils/timeBetweenLists.js';
import Card from './Card.vue';

const decimalRoundParameter = 100;

export default {
  name: 'wipHistogramWrapper',
  props: {
    cardActivities: Array,
    wipLists: Array,
    cards: Array,
    allLabels: Array,
    allMembers: Array,
  },
  components: {
    WipHistogram,
    Card,
  },
  data() {
    return {
      selectedList: null,
      binWidth: 1,
      selectedCards: [],
      average: 0,
    };
  },
  watch: {
    wipLists() {
      if (this.wipLists.length === 0) this.selectedList = null;
      this.selectedList = this.wipLists[0].id;
    },
    selectedCards() {
      this.average = this.selectedCards.map((card) => card.time).reduce((a, b) => a + b) / this.selectedCards.length;
    },
  },
  mounted() {
    if (this.wipLists.length === 0) this.selectedList = null;
    this.selectedList = this.wipLists[0].id;
    this.binWidth = this.genWidth();
  },
  methods: {
    listActivities(listId) {
      return getListCards(this.cardActivities, listId);
    },
    genWidth() {
      const times = this.listTimes();
      if (times === undefined) return 1;
      const binSize = Math.ceil(Math.sqrt(times.length));

      return Math.round((times[times.length - 1].time - times[0].time) / binSize);
    },
    listTimes() {
      return getTimes(...this.listActivities(this.selectedList), true)
        .map((card) => ({
          time: Math.round(card.time * decimalRoundParameter) / decimalRoundParameter,
          card: card.card,
        })).sort((a, b) => a.time - b.time);
    },
    selectedBin(values) {
      this.selectedCards = values.slice();
      this.selectedCards = this.selectedCards.map((card) => ({
        card: this.cards.filter((cardData) => cardData.id === card.card.id)[0],
        time: card.time,
      }));
      this.selectedCards.sort((a, b) => b.time - a.time);
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/wipHistogramWrapper.scss"></style>
