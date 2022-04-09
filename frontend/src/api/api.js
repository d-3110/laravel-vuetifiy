import axiosBase from 'axios'
const axios = axiosBase.create({
  withCredentials: true,
  baseURL: '/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})
const base = axiosBase.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

const csrf = async url => {
  return await new Promise((resolve, reject) => {
    // sanctum/csrf-cookie
    base
      .get(url)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        // 認証エラー
        reject(error.response)
      })
  })
}

const auth = async (url, params = {}, config = {}) => {
  return await new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        // ログイン時はエラー画面に飛ばさない
        reject(error.response)
      })
  })
}

const me = async url => {
  return await new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        // 認証エラー
        reject(error.response)
      })
  })
}

const get = async (url, params = {}) => {
  return await new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
        handleError(error.response)
      })
  })
}

const post = async (url, params = {}, config = {}) => {
  return await new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
        handleError(error.response)
      })
  })
}

const patch = async (url, form) => {
  return await new Promise((resolve, reject) => {
    axios
      .post(url, form, {
        headers: {
          'content-type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PATCH',
        },
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
        handleError(error.response)
      })
  })
}

const put = async (url, params = {}) => {
  return await new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'content-type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PUT',
        },
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
        handleError(error.response)
      })
  })
}

const del = async (url, params = {}) => {
  return await new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'content-type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'DELETE',
        },
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
        handleError(error.response)
      })
  })
}

const otherGet = async (url, params = {}) => {
  return await new Promise((resolve, reject) => {
    axiosBase
      .get(url, { params: params })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
        handleError(error.response)
      })
  })
}

const download = async (url, params = {}) => {
  return await new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'GET',
      responseType: 'arraybuffer',
      params: params,
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
        handleError(error.response)
      })
  })
}

const handleError = function (error) {
  // Laravelエラー画面へ飛ばす
  // window.location = '/' + error.status
}

export default {
  csrf,
  me,
  auth,
  get,
  patch,
  post,
  put,
  del,
  otherGet,
  download,
}
