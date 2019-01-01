import Vue from 'vue'
import _ from 'lodash'
import fetch from 'js/fetch'
import * as types from 'store/mutation_types'

const state = {
	list: [],
	consumer_types: []
}

const getters = {
}

const actions = {
}

const mutations = {
	[types.SET_CONSUMER_LIST] (state, consumers) {
		Vue.set(state, 'list', consumers)
	},
	[types.SET_CONSUMER_TYPES] (state, consumer_types) {
		Vue.set(state, 'types', consumer_types)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}