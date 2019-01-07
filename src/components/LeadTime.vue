<template>
  <div>
    <h2>Lead Time Metrics</h2>
    <LeadTimeChart
      v-bind:cardActivities="cardActivities"
      v-bind:endListId="endListId"
      v-bind:progressStartListId="progressStartListId"
      v-bind:backlogListId="backlogListId"
      v-bind:productionListId="productionListId"
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
    progressStartListId: String,
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
