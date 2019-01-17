<template>
  <div :class="classObject">
    <h4>{{ card.name }}</h4>
    <p><b>Days: </b>{{ timeInList }}</p>
  </div>
</template>

<script>
import moment from 'moment';

const decimalPadding = 2;

export default {
  name: 'Card',
  props: {
    card: Object,
    warning: Boolean,
    activities: Array,
  },
  computed: {
    classObject() {
      return {
        box: true,
        warning: this.warning,
      };
    },
    timeInList() {
      const activity = this.activities.length === 1 ?
        this.activities[0] :
        this.activities.slice().sort((filteredActivity1, filteredActivity2) =>
          moment(filteredActivity2).diff(filteredActivity1, 'seconds', true)
        )[0];

      return activity === undefined ? '0' : moment().diff(activity.date, 'days', true).toFixed(decimalPadding);
    },
  },
};
</script>

<style>
.box {
  width: 18%;
  margin: 0.5%;
  border-style: solid;
  border-width: 1px;
  border-color: silver;
  background-color: gainsboro;
}
.warning {
  background-color: salmon;
}
</style>
