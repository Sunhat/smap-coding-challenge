import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const fetch = {

	httpInstance: axios.create({
		baseURL: 'http://localhost:8000/api/',
		timeout: 15000,
		withCredentials: true,
		onerror: function (error) {
			console.log(error)
		}
	}),

	post (endpoint, data) {
		return this.httpInstance.post(endpoint, data).then(response => {
			return response.data
		})
	},

  	patch (endpoint, data) {
		return this.httpInstance.patch(endpoint, data).then(response => {
		return response.data
		})
  	},
  
  	delete (endpoint, data) {
		return this.httpInstance.delete(endpoint, data).then(response => {
			return response.data
		})
  	},

  	get (endpoint, data) {
		return this.httpInstance.get(endpoint, {params: data}).then(response => {
			return response.data
		})
	}
}

export default fetch
