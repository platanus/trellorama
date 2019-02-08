<template>
  <div>
    <p class="dashboard__number">{{ speed }}</p>
    <p class="dashboard__text">{{ $t('teamSpeed.legend') }}</p>
  </div>
</template>
<script>
import { filterActivities, speedProjection, excludeActivities } from '../utils/speedUtil.js';

export default {
  name: 'TeamSpeed',
  props: {
    cardActivities: Array,
    endListIds: Array,
    endDate: Date,
    startDate: Date,
    productionListIds: Array,
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
  computed: {
    cards() {
      return Object.values(this.$store.state.allCardsByList).flat();
    },
    excludedLists() {
      return this.$store.state.lists.map((list) => list.id)
        .filter((list) => !this.endListIds.includes(list))
        .filter((list) => !this.productionListIds.includes(list));
    },
  },
  methods: {
    getSpeed() {
      return speedProjection(
        excludeActivities(
          this.cards,
          filterActivities(this.cardActivities, this.endListIds, 'week'),
          this.excludedLists
        ),
        this.startDate,
        this.endDate
      );
    },
  },
};

</script>
