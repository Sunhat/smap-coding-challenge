import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const fetch = {

  httpInstance: axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 8000,
    withCredentials: true,
    onerror: function (error) {
      console.log(error)
    }
  }),

  post (endpoint, data, callback) {
    return this.httpInstance.post(endpoint, data).then(response => {
      return response.data
    })
  },

  patch (endpoint, data, callback) {
    return this.httpInstance.patch(endpoint, data).then(response => {
      return response.data
    })
  },

  get (endpoint, data, callback) {
    return this.httpInstance.get(endpoint, {params: data}).then(response => {
      return response.data
    })
  }
}

export default fetch
