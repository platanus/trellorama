<template>
  <div
    id="dashboardSubOptionsContainer"
    class="dashboard-options dashboard-options--suboptions dashboard-options-small">
    <div class="dashboard-options--option">
      <button class="button dashboard-options--button" v-on:click="toggleOptions">
        <font-awesome-icon icon="bars" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">{{ $t('dashboard.subOptions.menu') }}</p>
    </div>
    <div class="dashboard-options--option">
      <button id="future" class="button dashboard-options--button">
        <font-awesome-icon icon="chart-area" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">{{ $t('dashboard.subOptions.cumulative') }}</p>
    </div>
    <div class="dashboard-options--option">
      <button id="present" class="button dashboard-options--button">
        <font-awesome-icon icon="chart-bar" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">{{ $t('dashboard.subOptions.histogram') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboardSubOptions',
  components: {
  },
  props: {
  },
  data() {
    return {
      minimized: true,
    };
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    toggleOptions() {
      this.minimized = !this.minimized;
      document.getElementById('dashboardSubOptionsContainer').classList.toggle('dashboard-options-small');
    },
  },
};
</script>
