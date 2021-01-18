export const initialState = {
    response: { data: [] },
    loading: false,
    status: 'NOT_STARTED',
    errors: null,
    requestAction: null
  }
  
  const fetchAPIReducer = (state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return {
          ...state,
          status: 'FETCHING',
          loading: true,
          errors: null,
          requestAction: action.requestAction
        }
      case 'SUCCESS':
        return { ...state, status: 'SUCCESS', loading: false, response: action.responseData }
      case 'ERROR':
        return { ...state, status: 'ERROR', loading: false, errors: action.errors }
      default:
        return state
    }
  }
  
  export default fetchAPIReducer
