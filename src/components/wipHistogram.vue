<script>
import { Bar } from 'vue-chartjs';
import { getTimes } from '../utils/timeBetweenLists.js';
import { getColor } from '../utils/chartUtils.js';

const decimalRoundParameter = 10;

export default {
  name: 'wipHistogram',
  mixins: [Bar],
  props: {
    activities: Array,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
      chartdata: {
        labels: [],
        datasets: [],
      },
    };
  },
  computed: {
    listTimes() {
      return getTimes(...this.activities)
        .map((time) => Math.round(time * decimalRoundParameter) / decimalRoundParameter);
    },
    labels() {
      return Array.from(new Set(this.listTimes)).sort((a, b) => a - b);
    },
    data() {
      return this.labels.map((label) => this.listTimes.filter((time) => time === label).length);
    },
  },
  watch: {
    activities() {
      this.renderData();
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.chartdata.labels = this.labels;
      this.chartdata.datasets[0] = {
        label: '',
        labels: this.labels,
        data: this.data,
        backgroundColor: getColor('blue')[0],
      };
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
};
</script>
