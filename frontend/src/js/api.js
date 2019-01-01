import fetch from 'js/fetch'


export default {
	consumers: {
		getAll () {
			return fetch.get('consumers')
		}
	}

}