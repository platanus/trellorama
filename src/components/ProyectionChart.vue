<script>
import { Line, mixins } from 'vue-chartjs';

const { reactiveData } = mixins;

export default {
  name: 'ProyectionChart',
  mixins: [Line, reactiveData],
  props: {
    cardActivities: {
      type: Array,
      default: null,
    },
    speed: Number,
    timeUnitsForward: Number,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        chartdata: {},
      },
    };
  },
  watch: {
    cardActivities() {
      this.renderData();
    },
    speed() {
      this.renderData();
    },
    timeUnitsForward() {
      this.renderData();
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
};
</script>
