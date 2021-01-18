import { useState, useReducer, useCallback, useEffect } from 'react'
import axios from 'axios'
import fetchAPIReducer, { initialState } from './fetch_api_reducer'

const SERVER_URL = process.env.REACT_APP_API_DOMAIN_URL

const useFetchAPI = (path) => {
  const [resourcePath] = useState(path)
  const source = axios.CancelToken.source()

  const [fetchState, dispatchFetch] = useReducer(fetchAPIReducer, initialState)

  useEffect(() => {
    return () => source.cancel()
  }, [])

  const dispatchSuccess = (response, params) => {
    const { httpAction } = params
    let responseData = response.data

    if (httpAction === 'get') {
      responseData = { data: response.data ? response.data.data : [response.data] }
    }

    dispatchFetch({ type: 'SUCCESS', responseData })
    return responseData
  }

  const dispatchError = (response) => {
    dispatchFetch({ type: 'ERROR', errors: response })

    return response
  }

  const fetchAPI = useCallback((params) => {
    dispatchFetch({ type: 'FETCHING', requestAction: params.requestAction })

    let url = `${SERVER_URL}/api/${resourcePath}`
    url = params.query ? `${url}?${params.query}` : url

    axios({
      cancelToken: source.token,
      method: params.httpAction,
      url,
      responseType: 'json',
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
      .then((response) => dispatchSuccess(response, params))
      .catch((response) => {
        if (!axios.isCancel(response)) dispatchError(response, params.dialogMessages)
      })
  }, [])

  return {
    loading: fetchState.loading,
    responseData: fetchState.response,
    errors: fetchState.errors,
    status: fetchState.status,
    fetchAPI,
    requestAction: fetchState.requestAction
  }
}

export default useFetchAPI
