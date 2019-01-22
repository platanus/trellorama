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
      <button id="cumulative" v-on:click="setTab('cumulative')" class="button dashboard-options--button">
        <font-awesome-icon icon="chart-area" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">{{ $t('dashboard.subOptions.cumulative') }}</p>
    </div>
    <div class="dashboard-options--option">
      <button id="histogram" v-on:click="setTab('histogram')" class="button dashboard-options--button">
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
    dashboardState: String,
  },
  data() {
    return {
      minimized: true,
      tab: null,
    };
  },
  mounted() {
    if (this.dashboardState === 'past') {
      this.setTab('cumulative');
    }
  },
  watch: {
    tab(newState, oldState) {
      if (oldState !== null) document.getElementById(oldState).classList.toggle('dashboard-options--button-active');
      document.getElementById(newState).classList.toggle('dashboard-options--button-active');
    },
  },
  methods: {
    toggleOptions() {
      this.minimized = !this.minimized;
      document.getElementById('dashboardSubOptionsContainer').classList.toggle('dashboard-options-small');
    },
    setTab(value) {
      this.tab = value;
      this.$emit('tab', this.tab);
    },
  },
};
</script>
