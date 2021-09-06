import axios from 'axios'
import apiEndpoint from '../webapi/api'

export const namespaced = true
// const getters = {}
export const actions = {
  apiRequest (context, reqData) {
    return new Promise((resolve, reject) => {
      const req = {}
      req.timeout = 10000
      if (
        apiEndpoint[reqData.api].method === 'post' ||
        apiEndpoint[reqData.api].method === 'delete' ||
        apiEndpoint[reqData.api].method === 'patch'
      ) {
        req.data = reqData.data
        req.method = apiEndpoint[reqData.api].method
      } else {
        req.params = reqData.params
        req.method = apiEndpoint[reqData.api].method
      }
      req.url = apiEndpoint[reqData.api].url
      req.headers = {
        Authorization: localStorage.getItem('token')
      }
      if (reqData.api === 'getCityApi' || reqData.api === 'getPrefApi') {
        //req.headers['X-API-KEY'] = process.env.GET_CITY_APIKEY
        req.headers['X-API-KEY'] = 'UTcSHZB4MAnbEfmMQznGeiFmyapUsZjwhz9ulUrv'
      }
      console.log('request', req)
      axios(req)
        .then((response) => {
          console.log('response', response)
          resolve(response)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
}
