<template>
	<div v-if="filteredConsumerList.length > 0">
		<delete-consumer-modal ref="deleteModal" :id="selectedConsumerId" />
		<sui-dropdown
			placeholder="Filter By..."
			selection
			:options="consumerTypeOptions"
			v-model="selectedType"
		/>
		<sui-table striped color="olive">
			<sui-table-header>
				<sui-table-row>
					<sui-table-header-cell>Customer Name</sui-table-header-cell>
					<sui-table-header-cell>Voltage</sui-table-header-cell>
					<sui-table-header-cell />
					<sui-table-header-cell />
				</sui-table-row>
			</sui-table-header>
			<sui-table-body>
				<sui-table-row v-for="(consumer, index) in filteredConsumerList" :key="index">
					<sui-table-cell>
						{{ consumer.name }}
					</sui-table-cell>
					<sui-table-cell>
						{{ startCase(consumer.consumer_type) }}
					</sui-table-cell>
					<sui-table-cell collapsing>
						<sui-button tag="a"positive icon="eye" @click.native="viewConsumer" />
					</sui-table-cell>
					<sui-table-cell collapsing>
						<sui-button negative icon="trash" @click.native="deleteConsumer(consumer.id)" />
					</sui-table-cell>
				</sui-table-row>
			</sui-table-body>
		</sui-table>
	</div>
</template>

<script>
import DeleteConsumerModal from 'components/Consumers/DeleteConsumerModal'
import _ from 'lodash'
export default {
	components: { DeleteConsumerModal },
	data () {
		return {
			selectedType: '',
			selectedConsumerId: null,
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
		deleteConsumer (id) {
			this.selectedConsumerId = id
			this.$refs.deleteModal.toggle()
		},
	},
	created () {
		this.$store.dispatch('consumers/getAll')
	}
}
</script>
