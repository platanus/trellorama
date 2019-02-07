<template>
  <div class="dashboard-content__container">
    <div class="dashboard__section">
      <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.past.title') }}</h2>
      <transition name="toggle" mode="out-in">
        <div class="dashboard__section" v-if="tab === 'stats'" key="stats">
          <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.present.stats') }}</h2>
          <h3 class="dashboard__text dashboard__subsection-title">
            {{ $t('dashboard.present.speedVsBugs') }}
          </h3>
          <div class="dashboard-present__numbers-container">
            <TeamSpeed
              class="stats"
              v-bind:cardActivities="cardActivities"
              v-bind:endListIds="endListIds"
              v-bind:startDate="startDate"
              v-bind:endDate="endDate"
            />
            <div style="width: 100%"></div>
            <objectivePercentage
              v-bind:cards="Object.values(cardsByList).flat()"
              v-bind:boardId="boardId"
              v-bind:endListIds="endListIds"
              v-bind:productionListIds="productionListIds"
            />
          </div>
          <LeadTime
            class="dashboard__single-item-container"
            v-bind:cardActivities="leadMetricsActivities"
            v-bind:endListIds="endListIds"
            v-bind:progressListIds="progressListsIds"
            v-bind:backlogListIds="backlogListIds"
            v-bind:productionListIds="productionListIds"
          />
        </div>
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
          v-bind:activities="allCardsActivities"
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
          v-bind:productionListIds="productionListIds"
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
import objectivePercentage from './objectivePercentage.vue';
import TeamSpeed from './TeamSpeed';
import LeadTime from './LeadTime.vue';

export default {
  name: 'pastDashboard',
  components: {
    CumulativeWrapper,
    WipHistogramWrapper,
    HistoricalBugsWrapper,
    HistoricalSpeedWrapper,
    HistoricalLeadTimeWrapper,
    TeamSpeed,
    LeadTime,
    objectivePercentage,
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
    allCardsActivities: Array,
    cardsByList: Object,
  },
};
</script>
