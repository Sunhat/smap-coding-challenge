<template>
	<div>
		<div v-if="consumer">
			<sui-header>{{ consumer.name }}</sui-header>
		</div>
		<sui-segment v-if="consumer && consumer.stats">
			<consumer-usage-graph :id="consumer.id" />
		</sui-segment>
	</div>
</template>

<script>
import ConsumerUsageGraph from 'components/Consumers/ConsumerUsageGraph'
export default {
	components: { ConsumerUsageGraph },
	computed: {
		consumer () {
			return this.$store.state.consumers.list.find(item => item.id == this.$route.params.id)
		}
	},
	created () {
		if(!this.consumer)
			this.$store.dispatch('consumers/find', this.$route.params.id)
		if(!this.consumer || !this.consumer.stats)
			this.$store.dispatch('consumers/getStats', this.$route.params.id)
	}
}
</script>
