import Vue from 'vue'
import VueX from 'vuex'

// Store modules
import consumers from 'js/store/consumers.store'
import app from 'js/store/app.store'
import alert from 'js/store/alert.store'

import * as types from 'js/store/mutation_types'

Vue.use(VueX)

// Boot the store
export default new VueX.Store({
	plugins: [(store) => {
	  store.subscribeAction(async (action, state, done) => {
		  console.log(done)
			// console.log(store.commit(`app/${types.INCREMENT_LOADING}`))
			console.log("Action Type: ", action.type)
			console.log("Action Payload: ", action.payload)
			console.log("Current State: ", state)
	  })
	}],
	modules: {
		consumers,
		app,
		alert
	},
})