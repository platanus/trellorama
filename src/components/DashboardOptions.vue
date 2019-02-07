<template>
  <div :class="containerClass">
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
    <hr class="dashboard-options__hr">
    <DashboardOption
      :text="$t('general.settings')"
      icon="cogs"
      :minimized="minimized"
      :buttonFunction="enterWizard"
    />
    <DashboardOption
      :text="$t('board.labelFilter')"
      icon="tags"
      :minimized="minimized"
      :buttonFunction="toggleLabels"
    />
    <transition name="hide">
      <div class="dashboard-options__labels" v-if="showLabels">
        <button class="button button--small" v-on:click="selectAllLabels">
            {{ $t('board.selectAll') }}
        </button>
        <button class="button button--small" v-on:click="unselectAllLabels">
            {{ $t('board.unselectAll') }}
        </button>
        <div v-for="labelOption in labelOptions"
          v-bind:key="labelOption.value === null ? 'noLabel' : labelOption.value" class="dashboard-checkbox__label">
          <input type="checkbox"
            :id="labelOption.value === null ? 'noLabel' : labelOption.value"
            :value="labelOption.value" v-model="selectedLabels" style="display: none;">
          <label :for="labelOption.value === null ? 'noLabel' : labelOption.value"
            :style="{ backgroundColor: getTrelloLabelColor(labelOption.color) }" class="trello-label">
            <font-awesome-icon icon="check" v-if="selectedLabels.includes(labelOption.value)" class="check-icon"/>
          </label>
          <label :for="labelOption.value === null ? 'noLabel' : labelOption.value"
            class="dashboard-options__text dashboard-options__text-small">
            {{labelOption.label}}
          </label>
        </div>
      </div>
    </transition>
    <DashboardOption
      :text="$t('board.memberFilter')"
      icon="users"
      :minimized="minimized"
      :buttonFunction="toggleMembers"
    />
    <transition name="hide">
      <div class="dashboard-options__labels" v-if="showMembers">
        <button class="button button--small" v-on:click="selectAllMembers">
            {{ $t('board.selectAll') }}
        </button>
        <button class="button button--small" v-on:click="unselectAllMembers">
            {{ $t('board.unselectAll') }}
        </button>
        <div v-for="member in allMembers" v-bind:key="member.id  === null ? 'noMember' : member.id"
          class="dashboard-checkbox__label">
          <input type="checkbox" :id="member.id  === null ? 'noMember' : member.id"
            :value="member.id" v-model="selectedMembers" style="display: none;">
          <label :for="member.id  === null ? 'noMember' : member.id"
            class="checkbox"></label>
          <label :for="member.id  === null ? 'noMember' : member.id">
            <img :src="getImage(member)" class="member-avatar">
          </label>
          <label :for="member.id  === null ? 'noMember' : member.id"
            class="dashboard-options__text dashboard-options__text-small">
            {{member.username}}
          </label>
        </div>
      </div>
    </transition>
    <DashboardOption
      :text="$t('board.dateFilter')"
      icon="calendar-day"
      :minimized="minimized"
      :buttonFunction="toggleDates"
    />
    <transition name="hide">
      <div class="dashboard-options__calendars" v-if="showDates">
        <label for="startDate" class="dashboard-options__text">{{ $t('board.startDate') }}: </label>
        <datepicker
          v-model="startDate"
          calendar-class="dashboard-options__calendar"
          :inline="true"
          name="startDate"
          placeholder="Start Date"
          format="yyyy-MM-dd"
        />
        <label for="endDate" class="dashboard-options__text">{{ $t('board.endDate') }}: </label>
        <datepicker
          v-model="endDate"
          calendar-class="dashboard-options__calendar"
          :inline="true"
          name="endDate"
          placeholder="End Date"
          format="yyyy-MM-dd"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { get, save } from '../utils/configurationPersistance.js';
import { subtractToDate } from '../utils/dateManager.js';
import DashboardOption from './DashboardOption.vue';

/* global require */

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
      selectedLabels: [],
      showLabels: false,
      showDates: false,
      startDate: new Date(get(
        `${this.board.id}_startDate`,
        subtractToDate(new Date(), 1, 'month', { unit: 'day' })
      )),
      endDate: new Date(),
      selectedMembers: [],
      showMembers: false,
    };
  },
  mounted() {
    this.selectStartDate();
    this.selectEndDate();
  },
  computed: {
    containerClass() {
      return {
        'dashboard-options': true,
        'dashboard-options-open': !this.minimized,
      };
    },
    labelOptions() {
      return this.$store.state.labels;
    },
    allMembers() {
      return this.$store.state.members;
    },
    dashboardState() {
      return this.$store.state.dashboardState;
    },
  },
  watch: {
    selectedLabels() {
      save(`${this.board.id}_selectedLabels`, this.selectedLabels);
      this.$emit('selectLabels', this.selectedLabels);
    },
    selectedMembers() {
      save(`${this.board.id}_selectedMembers`, this.selectedMembers);
      this.$emit('selectMembers', this.selectedMembers);
    },
    startDate() {
      this.selectStartDate();
    },
    endDate() {
      this.selectEndDate();
    },
    labelOptions() {
      this.selectedLabels = get(`${this.board.id}_selectedLabels`, null);
      const oldLabels = get(`${this.board.id}_oldLabels`, []);
      if (this.selectedLabels === null) this.selectedLabels = this.labelOptions.map((label) => label.value);
      this.labelOptions.filter((label) => !oldLabels.includes(label.value))
        .forEach((label) => this.selectedLabels.push(label.value));
      save(`${this.board.id}_oldLabels`, this.labelOptions.map((label) => label.value));
    },
    allMembers() {
      this.selectedMembers = get(`${this.board.id}_selectedMembers`, null);
      const oldMembers = get(`${this.board.id}_oldMembers`, []);
      if (this.selectedMembers === null) this.selectedMembers = this.allMembers.map((member) => member.id);
      this.allMembers.filter((member) => !oldMembers.includes(member.id))
        .forEach((member) => this.selectedMembers.push(member.id));
      save(`${this.board.id}_oldMembers`, this.allMembers.map((member) => member.id));
    },
  },
  methods: {
    toggleOptions() {
      this.minimized = !this.minimized;
      if (this.minimized) {
        if (this.showLabels) this.showLabels = false;
        if (this.showDates) this.showDates = false;
        if (this.showMembers) this.showMembers = false;
      }
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
      this.$store.commit('saveDashboardState', value);
    },
    toggleMembers() {
      if (this.minimized) this.toggleOptions();
      this.showMembers = !this.showMembers;
    },
    getImage(member) {
      if (member.avatarHash !== null) return `https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/30.png`;

      return require('../assets/user.png');
    },
    selectAllMembers() {
      this.selectedMembers = this.allMembers.map((member) => member.id);
    },
    unselectAllMembers() {
      this.selectedMembers = [];
    },
    selectAllLabels() {
      this.selectedLabels = this.labelOptions.map((label) => label.value);
    },
    unselectAllLabels() {
      this.selectedLabels = [];
    },
    getTrelloLabelColor(colorName) {
      const colors = {
        blue: '#0079BF',
        green: '#61BD4F',
        orange: '#FFAB4A',
        red: '#EB5A46',
        yellow: '#F2D600',
        purple: '#C377E0',
        pink: '#FF80CE',
        sky: '#E4F7FA',
        lime: '#51E898',
        shades: '#838C91',
        black: '#000000',
        null: 'transparent',
      };

      return colors[colorName];
    },
  },
};
</script>
