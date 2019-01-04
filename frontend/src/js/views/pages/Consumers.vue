<template>
	<div v-if="filteredConsumerList.length > 0">
		<modal-delete-consumer ref="deleteModal" :id="selectedConsumerId" />
		<modal-create-consumer ref="createModal" />
		<sui-dropdown
			placeholder="Filter By..."
			selection
			:options="consumerTypeOptions"
			v-model="selectedType"
		/>
		<sui-button @click.native="$refs.createModal.toggle()" color="blue">Create New</sui-button>
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
						<router-link is="sui-button" icon="eye" :to="viewConsumer(consumer.id)" positive />
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
import ModalDeleteConsumer from 'components/Consumers/ModalDeleteConsumer'
import ModalCreateConsumer from 'components/Consumers/ModalCreateConsumer'
import _ from 'lodash'
export default {
	components: { ModalDeleteConsumer, ModalCreateConsumer },
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
		},
	},
	methods: {
		startCase (string) {
			return _.startCase(string)
		},
		viewConsumer (id) {
			return {
				name: 'show_consumer_stats',
				params: { id }
			}
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
