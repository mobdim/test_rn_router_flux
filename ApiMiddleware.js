function checkStatus(response) {
  if (response.ok) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default ({getState, dispatch}) => next => action => {

  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  const {api, motion, params, types, options = {}, ...rest} = action
  if (!api && !motion) {
    return next(action)
  }

  let url

  if (motion) {
    url = AppConfig.motion.url + motion
  } else {
    url = api
  }

  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }


  //   options.credentials =  'include'

  if (params) {
    if (motion) {
      params.key = AppConfig.motion.key
      params.bot = AppConfig.motion.botId


      options.method = 'GET'

      var str = "?" + Object.keys(params).map(function (prop) {
        return [prop, params[prop]].map(encodeURIComponent).join("=")
      }).join("&")

      url += str

    } else {

      options.method = 'POST'
      options.body = JSON.stringify(params)

    }

  }

  const [REQUEST, SUCCESS, FAILURE] = types
  next({...rest, params, type: REQUEST})
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((result) => {
      console.log('fetch ' + url, result)
      if (result.error !== undefined) {
        throw new Error(result.error)
      } else {
        next({...rest, params, result, type: SUCCESS})
      }
    })
    .catch((error) => {
      const response = error.response

      if (response === undefined) {
        next({...rest, params, error, type: FAILURE})
      } else {
        parseJSON(response)
          .then(function (json) {
            error.status = response.status
            error.statusText = response.statusText
            error.message = json.message
            console.error(error)

            next({...rest, error, type: FAILURE})
          })
      }
    })
}
