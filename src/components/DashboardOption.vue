<template>
<div :class="containerClass">
  <button :class="buttonClass" v-on:click="buttonFunction">
    <font-awesome-icon :icon="icon" />
  </button>
  <p class="dashboard-options--text" v-if="!minimized">{{ text }}</p>
</div>
</template>

<script>
export default {
  name: 'dashboardOption',
  props: {
    text: String,
    minimized: Boolean,
    icon: String,
    selected: {
      type: Boolean,
      default: false,
    },
    buttonFunction: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    buttonClass() {
      return {
        'button': true,
        'dashboard-options--button': true,
        'dashboard-options--button-active': this.selected,
      };
    },
    containerClass() {
      return {
        'dashboard-options--option': true,
        'dashboard-options--option__centered': this.minimized,
      };
    },
  },
};
</script>
