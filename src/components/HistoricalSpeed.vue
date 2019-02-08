<script>
import { Bar } from 'vue-chartjs';
import moment from 'moment';
import { fillDatasetGaps, fillFromStartDate, getColor } from '../utils/chartUtils.js';
import { getDate } from '../utils/dateManager.js';
import { filterActivities, speedProjection, excludeActivities } from '../utils/speedUtil.js';

export default {
  name: 'historicalSpeed',
  mixins: [Bar],
  props: {
    activities: {
      type: Array,
      default: null,
    },
    dateTypeSelector: String,
    dayOfWeek: String,
    startDate: Date,
    endDate: Date,
    endListIds: Array,
    productionListIds: Array,
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
    this.renderData();
  },
  computed: {
    cards() {
      return Object.values(this.$store.state.allCardsByList).flat();
    },
    excludedLists() {
      return this.$store.state.lists.map((list) => list.id)
        .filter((list) => !this.endListIds.includes(list))
        .filter((list) => !this.productionListIds.includes(list));
    },
  },
  methods: {
    renderData() {
      this.buildChartData();
      this.renderChart(this.chartdata, this.chartoptions);
    },
    buildChartData() {
      const dateLabels = this.getLabels();
      const currentDataset = {
        label: this.$t('historicalSpeed.legend'),
        data: dateLabels.map((label) =>
          this.getSpeed(label)
        ),
        backgroundColor: getColor('speedBlue')[0],
        borderColor: getColor('speedBlue')[1],
        type: 'line',
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
      const specificSpeed = {
        label: this.$t('historicalSpeed.bar'),
        type: 'bar',
        backgroundColor: getColor('green')[0],
        data: dateLabels.map((label) => this.getSpecificSpeed(label)),
      };
      this.chartdata = {
        labels: dateLabels,
        datasets: [currentDataset, specificSpeed],
      };
    },
    getSpeed(endDate) {
      return speedProjection(
        excludeActivities(
          this.cards,
          filterActivities(
            this.activities.filter((activity) => moment(activity.date).isSameOrBefore(endDate, 'day')),
            this.endListIds,
            this.dateTypeSelector
          ),
          this.excludedLists
        ),
        this.startDate,
        endDate,
        true
      );
    },
    getLabels() {
      return [...new Set(
        this.activities.map((activity) => getDate(activity.date, this.dateTypeSelector, this.dayOfWeek))
      )]
        .sort((date1, date2) => moment(date1) - moment(date2));
    },
    getSpecificSpeed(label) {
      const prevLabel = getDate(
        moment(label).subtract(1, `${this.dateTypeSelector}s`),
        this.dateTypeSelector,
        this.dayOfWeek
      );

      return excludeActivities(
        this.cards,
        filterActivities(
          this.activities.filter((activity) => moment(activity.date).isBefore(label, this.dateTypeSelector)),
          this.endListIds,
          this.dateTypeSelector
        ),
        this.excludedLists
      ).filter((activity) => moment(activity.date).isSameOrAfter(prevLabel, this.dateTypeSelector)).length;
    },
  },
};
</script>
