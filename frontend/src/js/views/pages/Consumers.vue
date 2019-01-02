<template>
	<sui-container>
		<sui-dropdown
			placeholder="Filter By..."
			selection
			:options="consumerTypeOptions"
			v-model="selectedType"
		/>
		<sui-table>
			<thead>
				<tr>
					<th>Customer Name</th>
					<th>Voltage</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(consumer, index) in filteredConsumerList" :key="index">
					<td>{{ consumer.name }}</td>
					<td>{{ startCase(consumer.consumer_type) }}</td>
				</tr>
			</tbody>
		</sui-table>
	</sui-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import _ from 'lodash'
export default {
	data () {
		return {
			selectedType: '',
		}
	},
	computed: {
		consumerTypeOptions () {
			return [
				{ text: 'No Filter', value: ''},
				...this.$store.state.consumers.consumer_types,
			]
		},
		/**
		 * Filter the consumer list by selectedType if it's set
		 */
		filteredConsumerList () {
			if(this.selectedType.length === 0) return this.$store.state.consumers.list
			return this.$store.state.consumers.list.filter(c => c.consumer_type === this.selectedType)
		}
	},
	methods: {
		startCase (string) {
			return _.startCase(string)
		},
	},
	created () {
		this.$store.dispatch('consumers/getAll')
	}
}
</script>
