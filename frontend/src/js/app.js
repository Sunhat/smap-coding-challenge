import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'

// VueRouter Routes
import router from 'js/router'

// VueX Store
import store from 'js/store/store'

// Components
import Master from 'pages/Partials/Master'

// Activate Semantic UI in Vue. Registering global components
Vue.use(SuiVue)


// Instantiate Vue
new Vue({
	store,
	router,
	render: h => h(Master),
}).$mount('#vue')