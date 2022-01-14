import axios from 'axios'
import headers from './ApiHeaders'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000
})

instance.interceptors.request.use(config => {
  config.headers = headers()
  return config
})
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Unauthorized') {
      this.$store.commit('USER_LOGOUT')
      this.$router.push('/login')
    }

    throw error
  }
)

export default {
  auth: {
    login (form) {
      return instance({
        url: 'api/login',
        method: 'post',
        data: form
      })
    }
  },
  users: {
    getAll (qb) {
      return instance({
        url: 'api/users?' + qb.query(),
        method: 'get'
      })
    },
    getById (id) {
      return instance({
        url: `api/users/${id}`,
        method: 'get'
      })
    },
    delete (id) {
      return instance({
        url: `api/users/${id}`,
        method: 'delete'
      })
    },
    create (data) {
      return instance({
        url: 'api/users',
        method: 'post',
        data: data
      })
    },
    update (user, id) {
      return instance({
        url: `api/users/${id}`,
        method: 'put',
        data: user
      })
    }
  }
}
