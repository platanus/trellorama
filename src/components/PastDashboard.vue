<template>
  <div class="dashboard-content_container">
    <div class="dashboard__section">
      <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.future.title') }}</h2>
      <transition name="toggle" mode="out-in">
        <CumulativeWrapper
          v-if="tab === 'cumulative'"
          v-bind:cardActivities="cardActivities"
          v-bind:listIds="listIds"
          v-bind:boardId="boardId"
          v-bind:startDate="startDate"
          v-bind:endDate="endDate"
        />
        <WipHistogramWrapper
          v-if="tab === 'histogram'"
          v-bind:wipLists="wipLists"
          v-bind:cardActivities="cardActivities"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import CumulativeWrapper from './CumulativeWrapper.vue';
import WipHistogramWrapper from './WipHistogramWrapper.vue';

export default {
  name: 'pastDashboard',
  components: {
    CumulativeWrapper,
    WipHistogramWrapper,
  },
  props: {
    tab: String,
    cardActivities: Array,
    startDate: Date,
    endDate: Date,
    boardId: String,
    listIds: Array,
    wipLists: Array,
  },
};
</script>
