<template>
	<div class="chart">
		<span v-for="(y, i) in years" :key="i">
			{{ y }}
			<input type="checkbox" :value="y" v-model="checkedYears">
		</span>
	    <vue-c3 :handler="handler"></vue-c3>	
	</div>
</template>

<script>
import Vue from 'vue'
import VueC3 from 'vue-c3'
export default {
	components: { VueC3 },
	data () {
		return {
			handler: new Vue(),
			years: ['2016', '2017'],
			checkedYears: ['2016', '2017'],
			months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
			chartConfig: {
				type: 'bar',
				xFormat: '%Y%m%d',
				keys: {
					x: 'date',
					value: ['total_cost', 'total_bill', 'consumption', 'calculated_profit']
				},
				axis: {
					x: {
						type: 'timeseries',
						tick: {
							format (x) { return this.months[x.getMonth()]; }
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
		chartData () {
			return {
				data: {
					...this.chartConfig,
					json: [ ...this.stats ]
				}
			}
		},
		stats () {
			const consumer = this.$store.state.consumers.list.find(item => item.id == this.id)
			let stats = [ 
				...consumer.stats.filter(item => this.checkedYears.indexOf(String(item.year)) > -1)
			]

			stats = stats.reduce((accumulator , current) => {
				if(!accumulator[current.month])
					accumulator[current.month] = { total_cost: 0, total_bill: 0, month: 0, consumption: 0, calculated_profit: 0 }
				accumulator[current.month].total_cost += current.total_cost
				accumulator[current.month].total_bill += current.total_bill
				accumulator[current.month].consumption += current.consumption
				accumulator[current.month].calculated_profit += current.consumption - current.total_bill
				accumulator[current.month].month = parseInt(current.month)
				accumulator[current.month].date = new Date(current.year, current.month - 1)
				return accumulator
			}, {})

			stats = Object.keys(stats).map(x => stats[x])
			return stats
		}
	},
	methods: {
		setChartData() {
			this.handler.$emit('init', this.chartData)
		}
	},
	watch: {
		checkedYears () {
			this.setChartData()
		}
	},
	mounted () {
		this.setChartData()
	}
}
</script>

<style>
.chart {
	text-align: center;
	min-height: 400px;
}
.chart path {
    fill: none;
}
</style>
