import Vue from 'vue'

const state = {
	alerts: [],
	timer: 4000
}

// getters
const getters = {
	alerts: state => state.alerts,
	newAlerts: state => state.alerts.find(a => a.isNew === true),
	timer: state => state.timer
}

/**
 * DRY Function for actions below
 * Push alert, setTimeout for it to disappear after set time
 * @param {*} context 
 * @param {*} type 
 * @param {*} message 
 */
const pushAlert = function ({ commit, state }, type, message) {
	return new Promise((resolve) => {
		let alert = { type, message, isNew: true }
		commit('add', alert)
		setTimeout(() => {
			commit('markAsOld', alert)
		}, state.timer)
		resolve()
	})
}

// actions
const actions = {
	error (context, message) {
		return pushAlert(context, 'error', message)
	},
	success (context, message) {
		return pushAlert(context, 'success', message)
	}
}

// mutations
const mutations = {
	add (state, alert) {
		return state.alerts.push(alert)
	},
	remove (state, index) {
		delete state.alerts[index]
	},
	markAsOld (state, alert) {
		state.alerts.find(a => a === alert).isNew = false
	},
	removeAll (state) {
		Vue.set(state, 'alerts', [])
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
