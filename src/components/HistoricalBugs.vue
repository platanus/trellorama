<script>
import { Line } from 'vue-chartjs';
import moment from 'moment';
import { fillDatasetGaps, fillFromStartDate, getColor } from '../utils/chartUtils.js';
import { getDate } from '../utils/dateManager.js';

export default {
  name: 'historicalBugs',
  mixins: [Line],
  props: {
    activities: {
      type: Array,
      default: null,
    },
    dateTypeSelector: String,
    dayOfWeek: String,
    startDate: Date,
    backlogListIds: Array,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      chartdata: {},
    };
  },
  watch: {
    startDate() {
      this.renderData();
    },
    activities() {
      this.renderData();
    },
    dateTypeSelector() {
      this.renderData();
    },
    dayOfWeek() {
      this.renderData();
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.buildChartData();
      this.renderChart(this.chartdata, this.chartoptions);
    },
    getBugs(endDate) {
      const activities = this.activities.filter((activity) =>
        moment(activity.date).isSameOrBefore(endDate, `${this.dateTypeSelector}s`)
      );
      let incoming = activities
        .filter((activity) => activity.type === 'createCard')
        .filter((activity) => this.backlogListIds.includes(activity.data.list.id));
      incoming = incoming.concat(
        activities.filter((activity) => activity.type === 'updateCard')
          .filter((activity) =>
            !this.backlogListIds.includes(activity.data.listBefore.id) &&
            this.backlogListIds.includes(activity.data.listAfter.id)
          )
      );

      const outgoing = activities
        .filter((activity) => activity.type === 'updateCard')
        .filter((activity) =>
          this.backlogListIds.includes(activity.data.listBefore.id) &&
          !this.backlogListIds.includes(activity.data.listAfter.id)
        );

      return incoming.length - outgoing.length;
    },
    buildChartData() {
      const dateLabels = [...new Set(this.getLabels(this.activities))]
        .sort((date1, date2) => moment(date1) - moment(date2));
      const currentDataset = {
        label: this.$t('historicalBugs.legend'),
        data: dateLabels.map((label) => this.getBugs(label)),
        backgroundColor: getColor('bugRed')[1],
        borderColor: getColor('bugRed')[0],
      };
      fillDatasetGaps(
        dateLabels,
        currentDataset.data,
        {
          dateTypeSelector: this.dateTypeSelector,
          dayOfWeek: this.dayOfWeek,
          endDate: dateLabels[dateLabels.length],
        },
        false
      );
      fillFromStartDate(
        dateLabels,
        currentDataset.data,
        { dateTypeSelector: this.dateTypeSelector, dayOfWeek: this.dayOfWeek, startDate: this.startDate },
        false
      );
      const finalDateLabels = dateLabels.filter((label) =>
        moment(label).isSameOrAfter(this.startDate, this.dateTypeSelector)
      );
      currentDataset.data = currentDataset.data.slice(dateLabels.length - finalDateLabels.length);
      this.chartdata = {
        labels: finalDateLabels,
        datasets: [currentDataset],
      };
    },
    getLabels() {
      return this.activities.map((activity) => getDate(activity.date, this.dateTypeSelector, this.dayOfWeek));
    },
  },
};
</script>
