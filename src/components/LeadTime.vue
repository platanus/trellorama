<template>
  <div>
    <h2>Lead Time Metrics</h2>
    <LeadTimeChart
      v-bind:cardActivities="cardActivities"
      v-bind:endListIds="endListIds"
      v-bind:progressListIds="progressListIds"
      v-bind:backlogListIds="backlogListIds"
      v-bind:productionListIds="productionListIds"
    />
  </div>
</template>

<script>
import LeadTimeChart from './LeadTimeChart.vue';

export default {
  name: 'LeadTime',
  props: {
    cardActivities: Array,
    endListIds: Array,
    progressListIds: Array,
    backlogListIds: Array,
    productionListIds: Array,
  },
  components: {
    LeadTimeChart,
  },
  data() {
    return {
      leadTime: 0,
    };
  },
};
</script>
