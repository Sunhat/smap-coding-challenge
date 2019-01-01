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
	async getAll ({ commit }, consumers) {
		const data = await fetch.get('/consumers')
		// Pluck unique consumer_type's from each consumer
		const consumer_types = _.map(data, 'consumer_type')
		commit(types.SET_CONSUMER_LIST, data)
		commit(types.SET_CONSUMER_TYPES, consumer_types)
		return data
	}
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