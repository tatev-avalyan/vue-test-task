import store from '@/store'

export default () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (store.state.accessToken) {
    headers.Authorization = 'Bearer ' + store.state.accessToken
  }

  return headers
}
