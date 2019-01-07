<template>
  <div>
    <h2>Lead Time Metrics</h2>
    <LeadTimeChart
      v-bind:cardActivities="cardActivities"
      v-bind:endListId="endListId"
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
