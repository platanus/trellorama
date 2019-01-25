<template>
  <div :class="classObject" :style="style" v-on:click="goToTrello()">
    <h4>{{ card.name }}</h4>
    <p><b>{{ $t('wip.days') }}: </b>{{ days }}</p>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    card: Object,
    average: Number,
    days: String,
  },
  computed: {
    classObject() {
      return {
        box: true,
      };
    },
    style() {
      return {
        backgroundColor: this.genBackgroundColor(),
      };
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
  },
};
</script>
