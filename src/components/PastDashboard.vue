<template>
  <div class="dashboard-content__container">
    <div class="dashboard__section">
      <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.past.title') }}</h2>
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
          v-bind:cards="allListCards"
        />
        <HistoricalBugsWrapper
          v-if="tab === 'bugs'"
          v-bind:boardId="boardId"
          v-bind:activities="cardActivities"
          v-bind:cards="allListCards"
          v-bind:backlogListIds="backlogListIds"
          v-bind:startDate="startDate"
        />
        <HistoricalSpeedWrapper
          v-if="tab === 'speed'"
          v-bind:boardId="boardId"
          v-bind:activities="cardActivities"
          v-bind:endListIds="endListIds"
          v-bind:startDate="startDate"
          v-bind:endDate="endDate"
        />
        <HistoricalLeadTimeWrapper
          v-if="tab === 'historicalLeadTime'"
          v-bind:activities="leadMetricsActivities"
          v-bind:endListIds="endListIds"
          v-bind:progressListIds="progressListsIds"
          v-bind:backlogListIds="backlogListIds"
          v-bind:productionListIds="productionListIds"
          v-bind:endDate="endDate"
          v-bind:startDate="startDate"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import CumulativeWrapper from './CumulativeWrapper.vue';
import WipHistogramWrapper from './WipHistogramWrapper.vue';
import HistoricalBugsWrapper from './HistoricalBugsWrapper.vue';
import HistoricalSpeedWrapper from './HistoricalSpeedWrapper.vue';
import HistoricalLeadTimeWrapper from './HistoricalLeadTimeWrapper.vue';

export default {
  name: 'pastDashboard',
  components: {
    CumulativeWrapper,
    WipHistogramWrapper,
    HistoricalBugsWrapper,
    HistoricalSpeedWrapper,
    HistoricalLeadTimeWrapper,
  },
  props: {
    tab: String,
    cardActivities: Array,
    startDate: Date,
    endDate: Date,
    boardId: String,
    listIds: Array,
    wipLists: Array,
    allListCards: Array,
    endListIds: Array,
    backlogListIds: Array,
    leadMetricsActivities: Array,
    progressListsIds: Array,
    productionListIds: Array,
  },
};
</script>
