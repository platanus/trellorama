<template>
<div :class="containerClass"  v-on:click="buttonFunction">
  <button :class="buttonClass">
    <font-awesome-icon :icon="icon" />
  </button>
  <transition name="hide">
    <p class="dashboard-options__text" v-if="!minimized">{{ text }}</p>
  </transition>
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
        'dashboard-options__button': true,
        'dashboard-options__button-active': this.selected,
      };
    },
    containerClass() {
      return {
        'dashboard-options__option': true,
        // 'dashboard-options__option--centered': this.minimized,
      };
    },
  },
};
</script>
