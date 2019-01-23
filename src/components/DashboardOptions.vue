<template>
  <div id="dashboardOptionsContainer" class="dashboard-options dashboard-options-small">
    <DashboardOption
      :text="$t('dashboard.options.menu')"
      icon="bars"
      :minimized="minimized"
      :buttonFunction="toggleOptions"
    />
    <DashboardOption
      :text="$t('dashboard.options.future')"
      icon="clock"
      :minimized="minimized"
      :buttonFunction="() => {setState('future')}"
      :selected="dashboardState === 'future'"
    />
    <DashboardOption
      :text="$t('dashboard.options.present')"
      icon="map-marker-alt"
      :minimized="minimized"
      :buttonFunction="() => {setState('present')}"
      :selected="dashboardState === 'present'"
    />
    <DashboardOption
      :text="$t('dashboard.options.past')"
      icon="angle-double-left"
      :minimized="minimized"
      :buttonFunction="() => {setState('past')}"
      :selected="dashboardState === 'past'"
    />
    <hr style="width: 90%">
    <DashboardOption
      :text="$t('general.settings')"
      icon="cogs"
      :minimized="minimized"
      :buttonFunction="enterWizard"
    />
    <div class="dashboard-options--option">
      <DashboardOption
        :text="$t('board.labelFilter')"
        icon="tags"
        :minimized="minimized"
        :buttonFunction="toggleLabels"
      />
      <div style="width: 100%;" v-if="showLabels">
        <div v-for="labelOption in labelOptions" v-bind:key="labelOption.value">
          <input type="checkbox" :id="labelOption.value" :value="labelOption.value" v-model="selectedLabels">
          <label :for="labelOption.value" class="dashboard-options--text dashboard-options--text-small">
            {{labelOption.label}}
          </label>
        </div>
      </div>
    </div>
    <div class="dashboard-options--option">
      <DashboardOption
        :text="$t('board.dateFilter')"
        icon="calendar-day"
        :minimized="minimized"
        :buttonFunction="toggleDates"
      />
      <div style="width: 100%; height: 100%;" v-if="showDates">
        <label for="startDate" class="dashboard-options--text">{{ $t('board.startDate') }}: </label>
        <datepicker
          v-model="startDate"
          calendar-class="dashboard-options--calendar"
          :inline="true"
          name="startDate"
          placeholder="Start Date"
          format="yyyy-MM-dd"
        />
        <label for="endDate" class="dashboard-options--text">{{ $t('board.endDate') }}: </label>
        <datepicker
          v-model="endDate"
          calendar-class="dashboard-options--calendar"
          :inline="true"
          name="endDate"
          placeholder="End Date"
          format="yyyy-MM-dd"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { request, onRequestError } from '../utils/trelloManager.js';
import { get, save } from '../utils/configurationPersistance.js';
import { subtractToDate } from '../utils/dateManager.js';
import DashboardOption from './DashboardOption.vue';

export default {
  name: 'dashboardOptions',
  components: {
    Datepicker,
    DashboardOption,
  },
  props: {
    board: Object,
  },
  data() {
    return {
      minimized: true,
      labelOptions: [],
      selectedLabels: [],
      showLabels: false,
      showDates: false,
      startDate: new Date(get(
        `${this.board.id}_startDate`,
        subtractToDate(new Date(), 1, 'month', { unit: 'day' })
      )),
      endDate: new Date(),
      dashboardState: 'present',
    };
  },
  mounted() {
    this.getBoardLabels(this.board.id);
    this.selectStartDate();
    this.selectEndDate();
    this.$emit('dashboardState', this.dashboardState);
  },
  watch: {
    selectedLabels() {
      save(`${this.board.id}_selectedLabels`, this.selectedLabels);
      this.$emit('selectLabels', this.selectedLabels);
    },
    startDate() {
      this.selectStartDate();
    },
    endDate() {
      this.selectEndDate();
    },
  },
  methods: {
    toggleOptions() {
      this.minimized = !this.minimized;
      document.getElementById('dashboardOptionsContainer').classList.toggle('dashboard-options-small');
      if (this.minimized) {
        this.showLabels = false;
        this.showDates = false;
      }
    },
    getBoardLabels(boardId) {
      const self = this;
      request(
        `boards/${boardId}/labels`,
        (response) => {
          self.labelOptions = response.data.map((label) => ({ label: label.name, value: label.id }));
          self.labelOptions.push({ label: 'No Label', value: null });
          self.selectedLabels = get(`${this.board.id}_selectedLabels`, null);
          if (self.selectedLabels === null) self.selectedLabels = self.labelOptions.map((label) => label.value);
        },
        () => {
          onRequestError(self.getBoardLabels, [boardId]);
        }
      );
    },
    enterWizard() {
      this.$emit('setSettings', true);
    },
    toggleLabels() {
      if (this.minimized) this.toggleOptions();
      this.showLabels = !this.showLabels;
    },
    toggleDates() {
      if (this.minimized) this.toggleOptions();
      this.showDates = !this.showDates;
    },
    selectStartDate() {
      this.$emit('selectStartDate', this.startDate);
    },
    selectEndDate() {
      this.$emit('selectEndDate', this.endDate);
    },
    setState(value) {
      this.dashboardState = value;
      this.$emit('dashboardState', this.dashboardState);
    },
  },
};
</script>

