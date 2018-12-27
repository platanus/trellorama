<template>
  <div>
    <h2>Lead Time</h2>
    <p>
      <b>Days: </b> {{ leadTime }}
    </p>
  </div>
</template>

<script>
import { leadTime } from '../utils/timeBetweenLists.js';

export default {
  name: 'LeadTime',
  props: {
    cardActivities: Array,
    endListId: String,
  },
  data() {
    return {
      leadTime: 0,
    };
  },
  watch: {
    cardActivities() {
      this.leadTime = leadTime(this.cardActivities, this.endListId);
    },
  },
};
</script>
