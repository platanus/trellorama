<script>
import { Bar } from 'vue-chartjs';
import { getColor } from '../utils/chartUtils.js';

const numberOfDecimals = 2;
const decimalBase = 10;

export default {
  name: 'wipHistogram',
  mixins: [Bar],
  props: {
    binWidth: Number,
    listTimes: Array,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (_, item) => this.barClicked(item),
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.$t('wipHistogram.xTitle'),
              },
              barPercentage: 1.0,
              categoryPercentage: 1.0,
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.$t('wipHistogram.yTitle'),
              },
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
    labels() {
      const binSize = Math.ceil(
        (this.listTimes[this.listTimes.length - 1].time - this.listTimes[0].time) / this.binWidth
      );

      return [...Array(binSize).keys()].map((label) => label * this.binWidth);
    },
    data() {
      const data = [...Array(this.labels.length).keys()];

      return data.map((_, index) =>
        this.listTimes.filter((card) => card.time >= this.labels[index])
          .filter((card) => (index === this.labels.length - 1 ? true : card.time < this.labels[index + 1]))
      );
    },
  },
  watch: {
    listTimes() {
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
        label: this.$t('wipHistogram.legend'),
        labels: this.genLabels(),
        data: this.data.map((bin) => bin.length),
        backgroundColor: getColor('blue')[0],
      };
      this.renderChart(this.chartdata, this.chartoptions);
    },
    genLabels() {
      return this.labels.map((label, index, arr) =>
        `[${label.toFixed(numberOfDecimals, decimalBase)} - ${arr[index + 1] === undefined ?
          this.listTimes[this.listTimes.length - 1].time.toFixed(numberOfDecimals, decimalBase) :
          arr[index + 1].toFixed(numberOfDecimals, decimalBase)}[`
      );
    },
    barClicked(item) {
      if (item[0] === undefined) return;
      this.$emit('selectedBin', this.data[item[0]._index]); // eslint-disable-line
    },
  },
};
</script>
