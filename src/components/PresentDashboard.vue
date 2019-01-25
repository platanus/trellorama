<template>
  <div class="dashboard-content__container">
    <transition name="toggle" mode="out-in">
      <div class="dashboard__section" v-if="tab === 'stats'">
        <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.present.stats') }}</h2>
        <LeadTime
          class="dashboard__single-item-container"
          v-bind:cardActivities="leadMetricsActivities"
          v-bind:endListIds="endListIds"
          v-bind:progressListIds="progressListsIds"
          v-bind:backlogListIds="backlogListIds"
          v-bind:productionListIds="productionListIds"
        />
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
          <BugsPercentage
            class="stats"
            v-bind:cards="endListsCards"
            v-bind:boardId="boardId"
          />
        </div>
      </div>
      <div class="dashboard__section" v-if="tab === 'boardNow'">
        <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.present.boardNow') }}</h2>
        <WIPLists
          v-bind:cards="cardsByList"
          v-bind:lists="wipLists"
          v-bind:wipLimits="wipLimits"
          v-bind:activities="allCardsActivities"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import TeamSpeed from './TeamSpeed';
import LeadTime from './LeadTime.vue';
import WIPLists from './WIPLists.vue';
import BugsPercentage from './BugsPercentage.vue';

export default {
  name: 'presentDashboard',
  components: {
    TeamSpeed,
    LeadTime,
    WIPLists,
    BugsPercentage,
  },
  props: {
    endListIds: Array,
    progressListsIds: Array,
    backlogListIds: Array,
    productionListIds: Array,
    leadMetricsActivities: Array,
    cardActivities: Array,
    startDate: Date,
    endDate: Date,
    cardsByList: Object,
    wipLists: Array,
    wipLimits: Array,
    allCardsActivities: Array,
    endListsCards: Array,
    boardId: String,
    tab: String,
  },
};
</script>
