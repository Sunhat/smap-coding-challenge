import Vue from 'vue'
import _ from 'lodash'
import fetch from 'js/fetch'
import * as types from 'store/mutation_types'

const state = {
	list: [], // List of consumers
	consumer_types: [], // List of consumer_types (voltage types)
}


const getters = { }


const actions = {
	async getAll ({ commit }, consumers) {
		const data = await fetch.get('/consumers')
		// Pluck unique consumer_type's from each consumer
		const consumer_types = _.uniqBy(_.map(data, item => {
			return {
				text: _.startCase(item.consumer_type),
				value: item.consumer_type
			}
		}), 'value')
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
		Vue.set(state, 'consumer_types', consumer_types)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}