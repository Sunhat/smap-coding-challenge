import Vue from 'vue'
import _ from 'lodash'
import fetch from 'js/fetch'
import * as types from 'store/mutation_types'

const state = {
	loading: 0
}


const getters = {
	isLoading: state => state.loading > 0
}


const actions = { }


const mutations = {
	[types.INCREMENT_LOADING] (state, consumers) {
		state.loading++
	},
	[types.DECREMENT_LOADING] (state, consumer_types) {
		state.loading--
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}