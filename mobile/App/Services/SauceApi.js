import apisauce from 'apisauce'

// TODO: Base URL must be set here
const baseURL = ''

// Create API object from apisauce
const api = apisauce.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache'
  },
  timeout: 10000
})

// TODO: Define methods to send requests to the API here
const getHouses = (callback) => {
  api.get('')
  .then((res) => { callback(res) })
  .catch((error) => { console.error(error) })
}

// Export defined methods
export default {
  getHouses
}
