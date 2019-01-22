<template>
  <div id="dashboardOptionsContainer" class="dashboard-options dashboard-options-small">
    <div class="dashboard-options--option">
      <button class="button dashboard-options--button" v-on:click="toggleOptions">
        <font-awesome-icon icon="bars" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">Options</p>
    </div>
    <div class="dashboard-options--option">
      <button id="future" v-on:click="setState('future')" class="button dashboard-options--button">
        <font-awesome-icon icon="clock" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">Future</p>
    </div>
    <div class="dashboard-options--option">
      <button id="present"
        v-on:click="setState('present')" class="button dashboard-options--button dashboard-options--button-active">
        <font-awesome-icon icon="map-marker-alt" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">Present</p>
    </div>
    <div class="dashboard-options--option">
      <button id="past" v-on:click="setState('past')" class="button dashboard-options--button">
        <font-awesome-icon icon="angle-double-left" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">Past</p>
    </div>
    <hr style="width: 90%">
    <div class="dashboard-options--option">
      <button v-on:click="enterWizard" class="button dashboard-options--button">
        <font-awesome-icon icon="cogs" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">{{ $t('general.settings') }}</p>
    </div>
    <div class="dashboard-options--option">
      <div class="dashboard-options--option">
        <button v-on:click="toggleLabels" class="button dashboard-options--button">
          <font-awesome-icon icon="tags" />
        </button>
        <p class="dashboard-options--text" v-if="!minimized">{{ $t('board.labelFilter') }}</p>
        <div style="width: 100%;" v-if="showLabels">
          <div v-for="labelOption in labelOptions" v-bind:key="labelOption.value">
            <input type="checkbox" :id="labelOption.value" :value="labelOption.value" v-model="selectedLabels">
            <label :for="labelOption.value" class="dashboard-options--text dashboard-options--text-small">
              {{labelOption.label}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-options--option">
      <button class="button dashboard-options--button" v-on:click="toggleDates">
        <font-awesome-icon icon="calendar-day" />
      </button>
      <p class="dashboard-options--text" v-if="!minimized">{{ $t('board.dateFilter') }}</p>
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

export default {
  name: 'dashboardOptions',
  components: {
    Datepicker,
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
    dashboardState(oldState, newState) {
      document.getElementById(oldState).classList.toggle('dashboard-options--button-active');
      document.getElementById(newState).classList.toggle('dashboard-options--button-active');
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

<style type="text/css" src="../assets/style.css"></style>

