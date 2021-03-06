import Vue from 'vue'
import _ from 'lodash'
import fetch from 'js/fetch'
import * as types from 'store/mutation_types'
import consumersApi from 'js/api/consumers'

const state = {
	list: [], // List of consumers
	stats: [], // Statistics
	consumer_types: [], // List of consumer_types (voltage types),
	current_consumer: undefined,
}


const getters = {
	consumer_type_values: state => state.consumer_types.map(consumer => consumer.value)
}


const actions = {
	/**
	 * Fetch all Consumers
	 * Create list of consumer_types based on fetched data
	 * @param {Object} context
	 */
	async getAll ({ commit, dispatch }) {
		try {
			commit(`app/${types.INCREMENT_LOADING}`, null, { root: true })

			const data = await fetch.get('/consumers/')
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
		} catch (e) {
			dispatch('alert/error', 'Failed to load consumer list', { root: true })
		} finally {
			commit(`app/${types.DECREMENT_LOADING}`, null, { root: true })
		}
	},
	/**
	 * Destroy consumer by id
	 * @param {Object} context 
	 * @param {Int} id 
	 */
	async destroy ({ commit, state, dispatch }, id) {
		try {
			commit(`app/${types.INCREMENT_LOADING}`, null, { root: true })
			
			// Send delete request
			const data = await consumersApi.destroy(id)
			
			// Delete from State
			const consumer = state.list.find(item => item.id == id)
			commit(types.DELETE_CONSUMER, consumer)
			// Inform user
			dispatch('alert/success', `${consumer.name} deleted!`, { root: true })
		} catch (e) {
			dispatch('alert/error', 'Failed to delete', { root: true })
		} finally {
			commit(`app/${types.DECREMENT_LOADING}`, null, { root: true })
		}
	},
	/**
	 * Find consumer by id
	 * @param {Object} context 
	 * @param {Int} id
	 */
	async find ({ commit, state, dispatch }, id) {
		try {
			commit(`app/${types.INCREMENT_LOADING}`, null, { root: true })

			const data = await consumersApi.find(id)
			commit(types.SET_CONSUMER_LIST, [data])
		} catch (e) {
			dispatch('alert/error', 'Could not get Consumer', { root: true })
		} finally {
			commit('app/' + types.DECREMENT_LOADING, null, { root: true })
		}
	},
	/**
	 * Find consumer by id
	 * @param {Object} context 
	 * @param {Int} id
	 */
	async getStats ({ commit, state, dispatch }, id) {
		try {
			commit(`app/${types.INCREMENT_LOADING}`, null, { root: true })
			const data = await consumersApi.monthlyStats(id)
			commit(types.SET_CONSUMER_STATS, { id: id, stats: data })
			return data
		} catch (e) {
			dispatch('alert/error', 'Could not get Stats', { root: true })
		} finally {
			commit(`app/${types.DECREMENT_LOADING}`, null, { root: true })
		}
	},
	/**
	 * Create a new consumer
	 * @param {Object} context 
	 * @param {Object} consumer 
	 */
	async create ({ commit, dispatch }, consumer) {
		try {
			commit(`app/${types.INCREMENT_LOADING}`, null, { root: true })
			const data = await consumersApi.create(consumer)
			commit('SET_CONSUMER_LIST', [data])
			dispatch('alert/success', 'New Consumer created', { root: true })
		} catch (e) {
			dispatch('alert/error', 'Unable to create user. Please try again.', { root: true })
		} finally {
			commit(`app/${types.DECREMENT_LOADING}`, null, { root: true })
		}
	}
}

function mergeCollections(a, b) {
	return _.values(_.merge(_.keyBy(a, 'id'), _.keyBy(b, 'id')))
}

const mutations = {
	[types.SET_CONSUMER_LIST] (state, consumers) {
		state.list = mergeCollections(consumers, state.list)
	},
	[types.SET_CONSUMER_STATS] (state, consumer) {
		state.list = mergeCollections([consumer], state.list)
	},
	[types.SET_CONSUMER_TYPES] (state, consumer_types) {
		Vue.set(state, 'consumer_types', consumer_types)
	},
	[types.DELETE_CONSUMER] (state, consumer) {
		Vue.delete(state.list, state.list.indexOf(consumer))
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}