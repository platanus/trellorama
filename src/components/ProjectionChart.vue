<script>
import { Line, mixins } from 'vue-chartjs';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { getLabels, buildChartDataSet, getColor, fillDatasetGaps, fillFromStartDate } from '../utils/chartUtils.js';
import { addToDate } from '../utils/dateManager.js';

moment().format('yyyy-MM-dd');

const { reactiveData } = mixins;
const lineDashSize = 5;

const daysInAWeek = 7;

export default {
  name: 'ProjectionChart',
  mixins: [Line, reactiveData],
  props: {
    filteredActivities: {
      type: Array,
      default: null,
    },
    speed: Number,
    timeUnitsForward: Number,
    dateTypeSelector: String,
    optimistValue: Number,
    pesimistValue: Number,
    numberOfCards: Number,
    dayOfWeek: String,
    startDate: Date,
    goals: Array,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartdata: {},
    };
  },
  watch: {
    filteredActivities() {
      this.renderData();
    },
    speed() {
      this.renderData();
    },
    timeUnitsForward() {
      this.renderData();
    },
    optimistValue() {
      this.renderData();
    },
    pesimistValue() {
      this.renderData();
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  computed: {
    dateLabels() {
      return getLabels(this.filteredActivities);
    },
  },
  methods: {
    renderData() {
      this.buildChartData();
      this.renderChart(this.chartdata, this.chartoptions);
    },
    getSecondToLastItem(array) {
      const numberTwo = 2;

      return array[array.length - numberTwo];
    },
    buildCurrentDataset(dateLabels, finalDateLabels) {
      const currentDataset = buildChartDataSet(
        this.filteredActivities,
        this.dateLabels,
        'Current Progression',
        { color: 'black', fill: false }
      );
      fillDatasetGaps(
        this.dateLabels,
        currentDataset.data,
        {
          dateTypeSelector: this.dateTypeSelector,
          dayOfWeek: this.dayOfWeek,
          endDate: this.endDate,
        },
        false
      );
      fillFromStartDate(
        this.dateLabels,
        currentDataset.data,
        { dateTypeSelector: this.dateTypeSelector, dayOfWeek: this.dayOfWeek, startDate: this.startDate },
        false
      );
      currentDataset.data = currentDataset.data.slice(dateLabels.length - finalDateLabels.length);

      return currentDataset;
    },
    genData(dateLabels) {
      const finalDateLabels = dateLabels.filter((label) =>
        moment(label).isSameOrAfter(this.startDate, this.dateTypeSelector)
      );
      const currentDataset = this.buildCurrentDataset(dateLabels, finalDateLabels);
      const currentProjection = this.projectData(
        this.speed,
        this.timeUnitsForward,
        currentDataset,
        { colors: getColor('blue'), label: 'Current Projection' }
      );
      const optimistProjection = this.projectData(
        this.speed + this.optimistValue,
        this.timeUnitsForward,
        currentDataset,
        { colors: getColor('green'), label: 'Optimist Projection' }
      );
      const pesimistProjection = this.projectData(
        this.speed - this.pesimistValue,
        this.timeUnitsForward,
        currentDataset,
        { colors: getColor('red'), label: 'Pesimist Projection' }
      );
      const cardsLine = this.generateTotalCardsLine(
        currentDataset,
        currentProjection.data.length,
        this.numberOfCards,
        {
          colors: getColor('orange'),
          label: 'Number of Cards',
          borderDash: [lineDashSize, lineDashSize],
        }
      );
      const goalLines = this.goals.map((goal) =>
        this.generateTotalCardsLine(
          currentDataset,
          currentProjection.data.length,
          goal.count + currentDataset.data[currentDataset.data.length - 1],
          {
            colors: getColor('randomDash'),
            label: goal.label.label,
            borderDash: [lineDashSize, lineDashSize],
          }
        ));

      return [
        this.extendLabels(finalDateLabels, this.timeUnitsForward),
        goalLines.concat([currentDataset, currentProjection, optimistProjection, pesimistProjection, cardsLine]),
      ];
    },
    buildChartData() {
      const chartData = this.genData(getLabels(this.filteredActivities));
      this.chartdata = {
        labels: chartData[0],
        datasets: chartData[1],
      };
    },
    extendLabels(currentLabels, timeUnitsForward) {
      const newLabels = currentLabels.slice();
      let latestLabel = newLabels[newLabels.length - 1];

      [...Array(timeUnitsForward).keys()].forEach(() => {
        latestLabel = addToDate(latestLabel, 1, this.dateTypeSelector);
        newLabels.push(latestLabel);
      });

      return newLabels;
    },
    adaptProjectionRate(projectionRate, dateType) {
      switch (dateType) {
      case 'week':
        return projectionRate;
      case 'day':
        return projectionRate / daysInAWeek;
      default:
        return projectionRate;
      }
    },
    projectData(projectionRate, timeUnitsForward, baseDataset, datasetOptions) {
      const projectedDataset = cloneDeep(baseDataset);

      projectedDataset.borderColor = datasetOptions.colors[0];
      projectedDataset.backgroundColor = datasetOptions.colors[1];
      projectedDataset.label = datasetOptions.label;

      const lastValue = baseDataset.data[baseDataset.data.length - 1];
      [...Array(timeUnitsForward).keys()].forEach((timeUnit) => {
        projectedDataset.data.push(
          Math.floor(lastValue + (this.adaptProjectionRate(projectionRate, this.dateTypeSelector) * (timeUnit + 1)))
        );
      });

      return projectedDataset;
    },
    generateTotalCardsLine(baseDataset, dataLength, value, datasetOptions) {
      const cardsDataset = cloneDeep(baseDataset);

      cardsDataset.borderColor = datasetOptions.colors[0];
      cardsDataset.backgroundColor = datasetOptions.colors[1];
      cardsDataset.label = datasetOptions.label;
      cardsDataset.borderDash = datasetOptions.borderDash;
      cardsDataset.radius = 0;

      cardsDataset.data = Array(dataLength).fill(value);

      return cardsDataset;
    },
  },
};
</script>
