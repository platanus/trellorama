<template>
  <div>
    <h2>{{ $t('wipHistogram.title') }}</h2>
    <label for="histListSelector">{{ $t('wipHistogram.selectList') }}: </label>
    <select v-model="selectedList" id="histListSelector">
      <option v-for="list in wipLists" :key="list.id" :value="list.id">{{ list.name }}</option>
    </select>
    <wipHistogram
      v-bind:activities="listActivities(selectedList)"
    />
  </div>
</template>

<script>
import wipHistogram from './wipHistogram.vue';
import { getListCards } from '../utils/timeBetweenLists.js';

export default {
  name: 'wipHistogramWrapper',
  props: {
    cardActivities: Array,
    wipLists: Array,
  },
  components: {
    wipHistogram,
  },
  data() {
    return {
      selectedList: null,
    };
  },
  watch: {
    wipLists() {
      if (this.wipLists.length === 0) this.selectedList = null;

      this.selectedList = this.wipLists[0].id;
    },
  },
  methods: {
    listActivities(listId) {
      return getListCards(this.cardActivities, listId);
    },
  },
};
</script>
