<template>
  <div :class="classObject" :style="style" v-on:click="goToTrello()">
    <div class="card-label__container">
      <div v-for="label in cardLabels" :key="label.id"
        class="card-label"
        :style="{ backgroundColor: getTrelloLabelColor(label.color) }">
          <p>{{ label.name }}</p>
      </div>
    </div>
    <h4 class="card-name">{{ card.name }}</h4>
    <p><b>{{ $t('wip.days') }}: </b>{{ days }}</p>
    <div class="card-member__container">
      <img v-for="member in cardMembers" :key="member.id"
        class="member-avatar" :src="getImage(member)">
    </div>
  </div>
</template>

<script>
/* global require */

export default {
  name: 'Card',
  props: {
    card: Object,
    average: Number,
    days: String,
    allLabels: {
      type: Array,
      default: () => [],
    },
    allMembers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    classObject() {
      return {
        card: true,
      };
    },
    style() {
      return {
        backgroundColor: this.genBackgroundColor(),
      };
    },
    cardLabels() {
      return this.allLabels.filter((label) => this.card.idLabels.includes(label.id));
    },
    cardMembers() {
      return this.allMembers.filter((member) => this.card.idMembers.includes(member.id));
    },
  },
  methods: {
    genBackgroundColor() {
      const days = parseFloat(this.days);
      if (days < this.average) return '#eaeaea';

      return `rgba(255, 0, 0, ${(days - this.average) / this.average})`;
    },
    goToTrello() {
      window.open(this.card.shortUrl, '_blank');
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
    getImage(member) {
      if (member.avatarHash !== null) return `https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/30.png`;

      return require('../assets/user.png');
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/card.scss"></style>
