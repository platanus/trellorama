<template>
  <div>
    <h2>Lead Time</h2>
    <p>
      <b>Days: </b> {{ leadTime }}
    </p>
  </div>
</template>

<script>
import { getBoardCards, getAverageTime } from '../utils/timeBetweenLists.js';

export default {
  name: 'LeadTime',
  props: {
    cardActivities: Array,
    endListIds: Array,
  },
  data() {
    return {
      leadTime: 0,
    };
  },
  watch: {
    cardActivities() {
      this.leadTime = 0;
      this.endListIds.forEach((listId) => {
        this.leadTime += getAverageTime(...getBoardCards(this.cardActivities, listId));
      });
      this.leadTime /= this.endListIds.length;
    },
  },
};
</script>
