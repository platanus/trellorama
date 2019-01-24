<script>
import { Bar } from 'vue-chartjs';
import { getTimes } from '../utils/timeBetweenLists.js';
import { getColor } from '../utils/chartUtils.js';

const decimalRoundParameter = 100;
const numberOfDecimals = 2;
const decimalBase = 10;

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
          xAxes: [
            {
              barPercentage: 1.0,
              categoryPercentage: 1.0,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
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
        .map((time) => Math.round(time * decimalRoundParameter) / decimalRoundParameter)
        .sort((a, b) => a - b);
    },
    binSize() {
      return Math.ceil(Math.sqrt(this.listTimes.length));
    },
    labels() {
      const width = (this.listTimes[this.listTimes.length - 1] - this.listTimes[0]) / this.binSize;

      return [...Array(this.binSize).keys()].map((label) => label * width);
    },
    data() {
      const data = [...Array(this.labels.length).keys()];

      return data.map((_, index) =>
        this.listTimes.filter((time) => time >= this.labels[index])
          .filter((time) => (index === this.labels.length - 1 ? true : time < this.labels[index + 1]))
          .length
      );
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
      this.chartdata.labels = this.genLabels();
      this.chartdata.datasets[0] = {
        label: '',
        labels: this.genLabels(),
        data: this.data,
        backgroundColor: getColor('blue')[0],
        borderColor: getColor('red')[0],
      };
      this.renderChart(this.chartdata, this.chartoptions);
    },
    genLabels() {
      return this.labels.map((label, index, arr) =>
        `[${label.toFixed(numberOfDecimals, decimalBase)} - ${arr[index + 1] === undefined ?
          this.listTimes[this.listTimes.length - 1].toFixed(numberOfDecimals, decimalBase) :
          arr[index + 1].toFixed(numberOfDecimals, decimalBase)}[`
      );
    },
  },
};
</script>
