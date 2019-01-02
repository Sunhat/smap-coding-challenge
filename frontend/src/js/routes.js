// Lazy Loaders
const Consumers = () => import('pages/Consumers.vue')


export default [
	{ path: '/', component: Consumers },
]