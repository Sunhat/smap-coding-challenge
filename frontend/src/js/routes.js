// Lazy Loaders
const Consumers = () => import('pages/Consumers.vue')
const Consumer = () => import('pages/Consumer.vue')


export default [
	{
		name: 'show_all_consumers',
		path: '/', component: Consumers
	},
	{
		name: 'show_consumer',
		path: '/consumer/:id',
		component: Consumer
	}
]