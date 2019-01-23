<template>
  <div
    id="dashboardSubOptionsContainer"
    class="dashboard-options dashboard-options--suboptions dashboard-options-small">
    <DashboardOption
      :text="$t('dashboard.subOptions.menu')"
      icon="bars"
      :minimized="minimized"
      :buttonFunction="toggleOptions"
    />
    <DashboardOption
      :text="$t('dashboard.subOptions.cumulative')"
      icon="chart-area"
      :minimized="minimized"
      :buttonFunction="() => {setTab('cumulative')}"
      :selected="tab === 'cumulative'"
    />
    <DashboardOption
      :text="$t('dashboard.subOptions.histogram')"
      icon="chart-bar"
      :minimized="minimized"
      :buttonFunction="() => {setTab('histogram')}"
      :selected="tab === 'histogram'"
    />
  </div>
</template>

<script>
import DashboardOption from './DashboardOption.vue';

export default {
  name: 'dashboardSubOptions',
  components: {
    DashboardOption,
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
