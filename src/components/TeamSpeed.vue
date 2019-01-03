<template>
  <div>
    <h2>Team Speed</h2>
    <p><b>By Week:</b> {{ speed }}</p>
  </div>
</template>
<script>
import { filterActivities, speedProjection } from '../utils/speedUtil.js';

export default {
  name: 'TeamSpeed',
  props: {
    cardActivities: Array,
    endListId: String,
    endDate: String,
    startDate: String,
  },
  data() {
    return {
      speed: 0,
    };
  },
  mounted() {
    this.speed = this.getSpeed();
  },
  watch: {
    cardActivities() {
      this.speed = this.getSpeed();
    },
  },
  methods: {
    getSpeed() {
      return speedProjection(filterActivities(this.cardActivities, this.endListId, 'week'), this.startDate, this.endDate);
    },
  },
};

</script>
