<template>
  <div
    :class="containerClass">
    <DashboardOption
      :text="$t('dashboard.subOptions.menu')"
      icon="bars"
      :minimized="minimized"
      :buttonFunction="toggleSubOptions"
    />
    <DashboardOption
      v-if="dashboardState === 'past'"
      :text="$t('dashboard.subOptions.cumulative')"
      icon="chart-area"
      :minimized="minimized"
      :buttonFunction="() => {setTab('cumulative')}"
      :selected="tab === 'cumulative'"
    />
    <DashboardOption
      v-if="dashboardState === 'past'"
      :text="$t('dashboard.subOptions.histogram')"
      icon="chart-bar"
      :minimized="minimized"
      :buttonFunction="() => {setTab('histogram')}"
      :selected="tab === 'histogram'"
    />
    <DashboardOption
      v-if="dashboardState === 'past'"
      :text="$t('dashboard.subOptions.bugs')"
      icon="bug"
      :minimized="minimized"
      :buttonFunction="() => {setTab('bugs')}"
      :selected="tab === 'bugs'"
    />
    <DashboardOption
      v-if="dashboardState === 'past'"
      :text="$t('dashboard.subOptions.speed')"
      icon="running"
      :minimized="minimized"
      :buttonFunction="() => {setTab('speed')}"
      :selected="tab === 'speed'"
    />
    <DashboardOption
      v-if="dashboardState === 'present'"
      :text="$t('dashboard.present.boardNow')"
      icon="table"
      :minimized="minimized"
      :buttonFunction="() => {setTab('boardNow')}"
      :selected="tab === 'boardNow'"
    />
    <DashboardOption
      v-if="dashboardState === 'present'"
      :text="$t('dashboard.present.stats')"
      icon="book"
      :minimized="minimized"
      :buttonFunction="() => {setTab('stats')}"
      :selected="tab === 'stats'"
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
    if (this.dashboardState === 'present') {
      this.setTab('boardNow');
    }
  },
  watch: {
    dashboardState() {
      if (this.dashboardState === 'past') {
        this.setTab('cumulative');
      }
      if (this.dashboardState === 'present') {
        this.setTab('boardNow');
      }
    },
  },
  computed: {
    containerClass() {
      return {
        'dashboard-options': true,
        'dashboard-options__suboptions': true,
        'dashboard-options-open': !this.minimized,
      };
    },
  },
  methods: {
    toggleSubOptions() {
      this.minimized = !this.minimized;
    },
    setTab(value) {
      this.tab = value;
      this.$emit('tab', this.tab);
    },
  },
};
</script>
