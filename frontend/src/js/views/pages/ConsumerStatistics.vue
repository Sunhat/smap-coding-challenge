<template>
	<div>
		<div v-if="consumer">
			<sui-header class="name">{{ consumer.name }} - {{ consumer.consumer_type }}</sui-header>
			<sui-dropdown
				v-if="consumerMenu.length > 0"
				placeholder="Filter By..."
				selection
				:options="consumerMenu"
				v-model="selectedConsumer"
			/>
		</div>
		<sui-segment v-if="consumer && !isLoading">
			<consumer-usage-graph :consumer="consumer" />
		</sui-segment>
	</div>
</template>

<script>
import ConsumerUsageGraph from 'components/Consumers/ConsumerUsageGraph'
import _ from 'lodash'
import { mapGetters } from 'vuex';
export default {
	components: { ConsumerUsageGraph },
	data () {
		return {
			selectedConsumer: null
		}
	},
	computed: {
		...mapGetters('app', ['isLoading']),
		consumer () {
			return this.$store.state.consumers.list.find(item => item.id == this.$route.params.id)
		},
		consumerMenu () {
			return _.map(this.$store.state.consumers.list, consumer => {
				return {
					text: consumer.name,
					value: consumer.id
				}
			})
		}
	},
	methods: {
		loadConsumers () {
			this.$nextTick(() => {
				this.selectedConsumer = parseInt(this.$route.params.id)
			})
			if(!this.consumer)
				this.$store.dispatch('consumers/getAll')
		}
	},
	watch: {
		selectedConsumer (to) {
			this.$router.push({
				name: 'show_consumer_stats',
				params: { id: to }
			})
		},
		'$route' () {
			this.loadConsumers()
		}
	},
	created () {
		window.test = this
		this.loadConsumers()
	}
}
</script>


<style lang="scss" scoped>
.name {
	text-transform: uppercase;
}
</style>
