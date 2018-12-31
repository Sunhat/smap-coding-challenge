import fetch from 'js/fetch'
import * as types from 'store/mutation_types'

const state = {
	consumers: undefined
}

const getters = {
}

const actions = {
}

const mutations = {
	[types.SET_CONSUMER_LIST] (state, consumers) {
		Vue.set(state, 'user', consumers)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}