<template>
  <div>
    <h2>Team Speed</h2>
    <p><b>By Week:</b> {{ weeklySpeed }}</p>
  </div>
</template>
<script>
import getDate from '../utils/getDate.js';

export default {
  name: 'TeamSpeed',
  props: {
    cardActivities: Array,
    endListId: String,
  },
  computed: {
    weeklySpeed() {
      return (this.filterActivities(this.endListId, 'week').length / [...new Set(this.filterActivities(this.endListId, 'week')
        .map((card) => card.date))].length).toFixed(1);
    },
  },
  methods: {
    filterActivities(endListId, dateType) {
      return this.cardActivities.filter((activity) => activity.type === 'updateCard')
        .filter((activity) => activity.data.listAfter.id === endListId)
        .map((activity) => ({ id: activity.data.card.id, date: getDate(activity.date, dateType) }))
        .sort((card) => card.date);
    },
  },
};

</script>
