import Vue from 'vue'
import VueX from 'vuex'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue'

// VueRouter routes
import routes from './routes'

// Components
import Master from 'pages/Partials/Master'

// VueX Stores
import storeModules from './store/store'


// Activate in Vue
Vue.use(VueX)
Vue.use(VueRouter)
Vue.use(SuiVue)

// Boot the route
const router = new VueRouter({
	mode:'history',
	routes,
})

// Boot the store
const store = new VueX.Store({
	modules: storeModules,
})

// Instantiate Vue
new Vue({
	store,
	router,
	render: h => h(Master),
}).$mount('#vue')