<script>
import { Doughnut } from 'vue-chartjs';
import { getColor } from '../utils/chartUtils.js';

export default {
  name: 'BugChart',
  mixins: [Doughnut],
  props: {
    cards: Array,
    bugLabels: Array,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartdata: {
        labels: [this.$t('bug.bug'), this.$t('bug.notBug')],
        datasets: [
          {
            data: [],
            backgroundColor: [
              getColor('red')[0],
              getColor('blue')[0],
            ],
          },
        ],
      },
    };
  },
  watch: {
    cards() {
      this.renderData();
    },
  },
  mounted() {
    this.renderData();
  },
  methods: {
    renderData() {
      if (this.cards === []) this.chartdata.datasets[0].data = [];
      else {
        this.chartdata.datasets[0].data = [
          this.cards.filter((card) =>
            card.labels.map((element) => element.id).some((label) => this.bugLabels.includes(label))
          ).length,
          this.cards.filter((card) =>
            card.labels.map((element) => element.id).some((label) => !this.bugLabels.includes(label))
          ).length,
        ];
      }
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
};
</script>
