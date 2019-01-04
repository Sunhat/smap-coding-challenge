import Vue from 'vue'
import VueRouter from 'vue-router'

// Lazy Loaders
const Consumers = () => import('pages/Consumers.vue')
const ConsumerStatistics = () => import('pages/ConsumerStatistics.vue')

Vue.use(VueRouter)

export default new VueRouter({
	mode:'history',
	routes: [
		{
			name: 'show_all_consumers',
			path: '/', component: Consumers
		},
		{
			name: 'show_consumer_stats',
			path: '/consumer/:id',
			component: ConsumerStatistics
		}
	],
})