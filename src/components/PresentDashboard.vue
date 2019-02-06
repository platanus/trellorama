<template>
  <div class="dashboard-content__container">
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
          <BacklogBugs
            class="stats"
            v-bind:cards="backlogListCards"
            v-bind:boardId="boardId"
          />
          <objectivePercentage
            class="stats"
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
      <div class="dashboard__section" v-if="tab === 'boardNow'" key="boardNow">
        <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.present.boardNow') }}</h2>
        <WIPLists
          v-bind:cards="cardsByList"
          v-bind:lists="wipLists"
          v-bind:wipLimits="wipLimits"
          v-bind:activities="allCardsActivities"
          v-bind:allLabels="allLabels"
          :allMembers="allMembers"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import TeamSpeed from './TeamSpeed';
import LeadTime from './LeadTime.vue';
import WIPLists from './WIPLists.vue';
import BacklogBugs from './BacklogBugs.vue';
import objectivePercentage from './objectivePercentage.vue';

export default {
  name: 'presentDashboard',
  components: {
    TeamSpeed,
    LeadTime,
    WIPLists,
    BacklogBugs,
    objectivePercentage,
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
    backlogListCards: Array,
    allLabels: Array,
    allMembers: Array,
  },
};
</script>

<style lang="scss" src="../assets/styles/presentDashboard.scss"></style>
