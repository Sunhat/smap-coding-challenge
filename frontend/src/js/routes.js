// Lazy Loaders
const Home = () => import('pages/Home.vue')


export default [
	{ path: '/', component: Home },
]