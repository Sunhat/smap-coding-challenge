<template>
	<div class="chart">

		<span class="years" v-for="(y, i) in years" :key="i" v-if="displayYears">
			<sui-checkbox :label="y" :value="y" toggle v-model="checked_years" />
		</span>
		<graph :config="chart_config" :data="graphStats" v-if="displayGraph" />
		<div v-if="!displayGraph">
			No Data Available
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Graph from 'components/Graph'
import moment from 'moment'
export default {
	components: { Graph },
	data () {
		return {
			handler: new Vue(),
			years: ['2016', '2017'],
			checked_years: ['2016', '2017'],
			graph_stats_object: {
				total_cost: 0,
				total_bill: 0,
				month: 0,
				consumption: 0,
				calculated_profit: 0,
				date: null,
			},
			chart_config: {
				data: {
					type: 'bar',
					x: 'date',
					xFormat: '%Y-%m-%d',
					keys: {
						x: 'date',
						xFormat: '%Y-%m-%d',
						value: ['total_cost', 'total_bill', 'consumption', 'calculated_profit']
					},
					names: {
						'total_cost': 'Total Cost',
						'total_bill': 'Total Bill',
						'consumption': 'Consumpton',
						'calculated_profit': 'Calculated Profit'      
					},
				},
				axis: {
					x: {
						type: 'timeseries',
			            tick: {
							format: '%b'
						}
					}
				}
			}
		}
	},
	props: {
		id: {
			type: [ Number, String ],
			required: true
		}
	},
	computed: {
		displayYears () {
			return this.consumerStats && this.consumerStats.length > 0
		},
		displayGraph () {
			return this.checked_years.length > 0 && this.displayYears
		},
		consumerStats () {
			return this.$store.state.consumers.list.find(item => item.id == this.id).stats
		},
		/**
		 * filter stats by year
		 */
		filteredStats () {
			return this.consumerStats.filter(item => this.checked_years.indexOf(String(item.year)) > -1)
		},
		/**
		 * Processed statistics for the graph
		 */
		graphStats () {
			return this.accumulateStats(this.filteredStats)
		}
	},
	methods: {
		/**
		 * Creates Object of Objects, keyed by month for the statistics
		 * This merges the same months of every year together.
		 * @param {Object} stats
		 */
		accumulateStats (stats) {
			const result = stats.reduce((accumulator , current) => {
				// If this is the first time the month has appeared, create it
				if(!accumulator[current.month])
					accumulator[current.month] = { ...this.graph_stats_object }
				// For each key, add its value to the accumulator value
				for(let key in this.graph_stats_object) {
					accumulator[current.month][key] = this.calculateStat(accumulator[current.month], current, key)
				}
				return accumulator
			}, {})
			// Convert Object of Objects to Array of Objects
			return Object.keys(result).map(x => result[x])
		},
		/**
		 * Some stats must be calculated on the front-end
		 * This will calculate an individual stat. Some stats are additional stats
		 * @param {Object} accumulator Object of a month inside of the accumulator
		 * @param {Object} stats Object of set of stats - Should come from current Array.reducer param
		 * @param {String} stat_to_calculate String for the current stat to be calculated
		 */
		calculateStat (accumulator, stats, stat_key) {
			if(stat_key === 'calculated_profit')
				return accumulator[stat_key] + (stats.consumption - stats.total_bill)
			if(stat_key === 'month')
				return parseInt(stats[stat_key])
			if(stat_key === 'date')
				return moment(new Date(stats.year, stats.month - 1)).format('YYYY-MM-DD')
			return this.fixDecimal(accumulator[stat_key] + stats[stat_key])
		},
		/**
		 * Fix to decimal place
		 * @param {number}
		 */
		fixDecimal(number) {
			return parseFloat(number.toFixed(2))
		}
	},
	watch: {
		id () {
			if(!this.consumerStats)
				this.$store.dispatch('consumers/getStats', this.id)
		}
	}
}
</script>

<style scoped>
.chart {
	text-align: center;
	min-height: 400px;
}
.years {
	display: inline-block;
	padding: 0 20px;
}
</style>
