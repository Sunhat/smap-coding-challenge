import Vue from 'vue'
import fetch from 'js/fetch'
import * as types from 'store/mutation_types'

const state = {
	list: [],
}

const getters = {
}

const actions = {
}

const mutations = {
	[types.SET_CONSUMER_LIST] (state, consumers) {
		Vue.set(state, 'list', consumers)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}