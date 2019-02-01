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
    filterDuplicates(activities) {
      return activities
        .filter((activity) =>
          activities.filter((filteredActivity) => filteredActivity.data.card.id === activity.data.card.id).length === 1
        ).concat(Object.values(
          activities.filter((activity) =>
            activities.filter((filteredActivity) => filteredActivity.data.card.id === activity.data.card.id).length > 1
          ).reduce((acc, cur) => Object.assign(acc, { [cur.data.card.id]: cur }), {}))
        );
    },
    getBugs(endDate) {
      let incoming = this.activities.filter((activity) =>
        (activity.type === 'updateCard' && this.backlogListIds.includes(activity.data.listAfter.id &&
         !this.backlogListIds.includes(activity.data.listBefore.id)))
      ).filter((activity) => moment(activity.date).isSameOrBefore(endDate, this.dateTypeSelector));
      incoming = incoming.concat(this.activities.filter((activity) => activity.type === 'createCard'))
        .filter((activity) => moment(activity.date).isSameOrBefore(endDate, this.dateTypeSelector));

      const outgoing = this.filterDuplicates(this.activities.filter((activity) =>
        (activity.type === 'updateCard' && !this.backlogListIds.includes(activity.data.listAfter.id) &&
         !this.backlogListIds.includes(activity.data.listBefore.id))
      ).filter((activity) => moment(activity.date).isBefore(endDate, this.dateTypeSelector)));

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
