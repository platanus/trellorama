<template>
  <div>
    <div class="dashboard-present__container">
      <LeadTime
        class="lead-time"
        v-bind:cardActivities="leadMetricsActivities"
        v-bind:endListIds="endListIds"
        v-bind:progressListIds="progressListsIds"
        v-bind:backlogListIds="backlogListIds"
        v-bind:productionListIds="productionListIds"
      />
      <div class="dashboard-present__numbers-container">
        <p class="dashboard__text dashboard__text-title dashboard__text-spaced">
          {{ $t('dashboard.present.speedVsBugs') }}
        </p>
        <TeamSpeed
          class="team-speed"
          v-bind:cardActivities="cardActivities"
          v-bind:endListIds="endListIds"
          v-bind:startDate="startDate"
          v-bind:endDate="endDate"
        />
        <BugsPercentage
          class="bugs-percentage"
          v-bind:cards="endListsCards"
          v-bind:boardId="boardId"
        />
      </div>
    </div>
    <WIPLists
      v-bind:cards="cardsByList"
      v-bind:lists="wipLists"
      v-bind:wipLimits="wipLimits"
      v-bind:activities="allCardsActivities"
    />
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
  },
};
</script>
