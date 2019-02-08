<template>
  <div class="dashboard-content__container">
    <div class="dashboard__section">
      <h2 class="dashboard__text dashboard__section-title">{{ $t('dashboard.future.title') }}</h2>
      <ProjectionWrapper
        v-bind:cardActivities="cardActivities"
        v-bind:endListIds="endListIds"
        v-bind:numberOfCards="numberOfCards"
        v-bind:startDate="startDate"
        v-bind:endDate="endDate"
        v-bind:boardId="boardId"
        v-bind:productionListIds="productionListIds"
      />
    </div>
  </div>
</template>

<script>
import ProjectionWrapper from './ProjectionWrapper.vue';

export default {
  name: 'futureDashboard',
  components: {
    ProjectionWrapper,
  },
  props: {
    endListIds: Array,
    cardActivities: Array,
    startDate: Date,
    endDate: Date,
    boardId: String,
    numberOfCards: Number,
    productionListIds: Array,
  },
};
</script>
