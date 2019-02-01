<template>
  <div class="stacked-bar-graph">
    <div class="category-container">
      <p class="category-text">
        {{ $t('leadTime.timeToLive') }} ({{ timeToLive.toLocaleString({maximumFractionDigits: 1}) }}) d
      </p>
      <div class="category-line category-line-top"></div>
    </div>
    <div v-if="responseTime !== '0'" class="bar bar-1" :style="responseWidth">
      <span class="tooltiptext">{{ $t('leadTime.responseTimeDesc') }}</span>
      {{ responseTime }}d
    </div>
    <div v-if="cycleTime !== '0'" class="bar bar-2" :style="cycleWidth">
      <span class="tooltiptext">{{ $t('leadTime.cycleTimeDesc') }}</span>
      {{ cycleTime }}d
    </div>
    <div v-if="deployTime !== '0'" class="bar bar-3" :style="deployWidth">
      <span class="tooltiptext">{{ $t('leadTime.deployTimeDesc') }}</span>
      {{ deployTime }}d
    </div>
    <div v-if="responseTime !== '0'" class="category-container" :style="responseWidth">
      <div class="category-line category-line-bottom"></div>
      <p class="category-text">{{ $t('leadTime.responseTime') }}</p>
    </div>
    <div v-if="cycleTime !== '0'" class="category-container" :style="cycleWidth">
      <div class="category-line category-line-bottom"></div>
      <p class="category-text">{{ $t('leadTime.cycleTime') }}</p>
    </div>
    <div v-if="deployTime !== '0'" class="category-container" :style="deployWidth">
      <div class="category-line category-line-bottom"></div>
      <p class="category-text">{{ $t('leadTime.deployTime') }}</p>
    </div>
    <div class="category-container" :style="leadWidth">
      <div class="category-line category-line-bottom"></div>
      <p class="category-text">
        {{ $t('leadTime.leadTime') }} ({{ leadTime.toLocaleString({maximumFractionDigits: 1})}}) d
      </p>
    </div>
  </div>
</template>

<script>
import { getAverageTime, getCardsBetweenTwoLists } from '../utils/timeBetweenLists.js';

const percentage = 100;

export default {
  name: 'LeadTImeChart',
  props: {
    cardActivities: Array,
    endListIds: Array,
    progressListIds: Array,
    backlogListIds: Array,
    productionListIds: Array,
  },
  data() {
    return {
      responseTime: 0,
      cycleTime: 0,
      deployTime: 0,
    };
  },
  computed: {
    timeToLive() {
      return (parseFloat(this.responseTime) + parseFloat(this.cycleTime) + parseFloat(this.deployTime));
    },
    leadTime() {
      return (parseFloat(this.responseTime) + parseFloat(this.cycleTime));
    },
    responseWidth() {
      return { width: `${(parseFloat(this.responseTime) / this.timeToLive) * percentage}%` };
    },
    cycleWidth() {
      return { width: `${(parseFloat(this.cycleTime) / this.timeToLive) * percentage}%` };
    },
    deployWidth() {
      return { width: `${(parseFloat(this.deployTime) / this.timeToLive) * percentage}%` };
    },
    leadWidth() {
      return {
        width: `${((parseFloat(this.responseTime) + parseFloat(this.cycleTime)) / this.timeToLive) * percentage}%`,
      };
    },
  },
  mounted() {
    this.calculate();
  },
  methods: {
    calculate() {
      this.responseTime = getAverageTime(
        ...getCardsBetweenTwoLists(this.cardActivities, this.backlogListIds, this.progressListIds),
        1
      );
      if (this.responseTime === 'NaN') this.responseTime = '0';
      this.cycleTime = getAverageTime(
        ...getCardsBetweenTwoLists(this.cardActivities, this.progressListIds, this.endListIds),
        1
      );
      if (this.cycleTime === 'NaN') this.cycleTime = '0';
      this.deployTime = getAverageTime(
        ...getCardsBetweenTwoLists(this.cardActivities, this.endListIds, this.productionListIds),
        1
      );
      if (this.deployTime === 'NaN') this.deployTime = '0';
    },
  },
  watch: {
    cardActivities() {
      this.calculate();
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/leadTimeChart.scss"></style>
