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
	/**
	 * Fetch all Consumers
	 * Create list of consumer_types based on fetched data
	 * @param {Object} context
	 */
	async getAll ({ commit, dispatch }) {
		try {
			commit('app/' + types.INCREMENT_LOADING, null, { root: true })
			const data = await fetch.get('/consumers')
			// Pluck unique consumer_type's from each consumer
			const consumer_types = _.uniqBy(_.map(data, item => {
				return {
					text: _.startCase(item.consumer_type),
					value: item.consumer_type
				}
			}), 'value')
			// Commit Initial Consumer data
			commit(types.SET_CONSUMER_LIST, data)
			commit(types.SET_CONSUMER_TYPES, consumer_types)
			return data
		} catch {
			dispatch('alert/error', 'Failed to load consumer list')
		} finally {
			commit('app/' + types.DECREMENT_LOADING, null, { root: true })
		}
	},
	/**
	 * Destroy consumer by id
	 * @param {*} context 
	 * @param {*} id 
	 */
	async destroy ({ commit, state, dispatch }, id) {
		try {
			commit('app/' + types.INCREMENT_LOADING, null, { root: true })
			const data = await fetch.delete(`/consumer/${id}`)
			const consumer = state.list.find(item => item.id == id)
			commit(types.DELETE_CONSUMER, consumer)
			dispatch('alert/success', `${consumer.name} deleted!`, { root: true })
		} catch (e) {
			console.log(e)
			dispatch('alert/error', 'Failed to delete', { root: true })
		} finally {
			commit('app/' + types.DECREMENT_LOADING, null, { root: true })
		}
	}
}


const mutations = {
	[types.SET_CONSUMER_LIST] (state, consumers) {
		Vue.set(state, 'list', consumers)
	},
	[types.SET_CONSUMER_TYPES] (state, consumer_types) {
		Vue.set(state, 'consumer_types', consumer_types)
	},
	[types.DELETE_CONSUMER] (state, consumer) {
		Vue.delete(state.list, state.list.indexOf(consumer))
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}