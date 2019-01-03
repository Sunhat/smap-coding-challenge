// Lazy Loaders
const Consumers = () => import('pages/Consumers.vue')
const ConsumerStatistics = () => import('pages/ConsumerStatistics.vue')


export default [
	{
		name: 'show_all_consumers',
		path: '/', component: Consumers
	},
	{
		name: 'show_consumer_stats',
		path: '/consumer/:id',
		component: ConsumerStatistics
	}
]