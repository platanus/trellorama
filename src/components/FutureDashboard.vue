<template>
  <div>
    <ProjectionWrapper
      v-bind:cardActivities="cardActivities"
      v-bind:endListIds="endListIds"
      v-bind:numberOfCards="numberOfCards"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
      v-bind:boardId="boardId"
    />
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
  },
};
</script>
