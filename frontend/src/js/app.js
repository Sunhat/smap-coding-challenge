import Vue from 'vue'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue'

// VueRouter routes
import routes from './routes'

// Components
import Master from 'pages/Master'
// Activate in Vue
Vue.use(VueRouter)
Vue.use(SuiVue)

// Boot the route
const router = new VueRouter({
	mode:'history',
	routes,
})
new Vue({
	router,
	render: h => h(Master),
}).$mount('#vue')