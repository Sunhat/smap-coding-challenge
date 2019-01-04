import fetch from 'js/fetch'

export default {
	allConsumers () {
		return fetch.get('/consumers/')
	},
	consumerById (id) {
		return fetch.get(`/consumer/${id}`)
	},
	monthlyStats (id) {
		return fetch.get(`/monthly_statistics/${id}`)
	},
	destroy (id) {
		return fetch.delete(`/consumer/${id}/`)
	},
	create (consumer) {
		console.log(consumer)
		console.log('createconsumer')
		return fetch.post(`/consumer/`, consumer)
	}
}