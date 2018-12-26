<template>
  <div>
    <h2>Lead Time</h2>
    <p>
      <b>Days: </b> {{ leadTime[0] }}
      <b>Hours: </b> {{ leadTime[1] }}
      <b>Minutes: </b> {{ leadTime[2] }}
      <b>Seconds: </b> {{ leadTime[3] }}
    </p>
  </div>
</template>

<script>
import timeBetweenLists from '../utils/timeBetweenLists.js';

export default {
  name: 'LeadTime',
  props: {
    cardActivities: Array,
    endListId: String,
  },
  data() {
    return {
      leadTime: [0, 0, 0, 0],
    };
  },
  watch: {
    cardActivities() {
      this.leadTime = timeBetweenLists(this.cardActivities, this.endListId);
    },
  },
};
</script>
