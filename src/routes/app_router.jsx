import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import { QueryParamProvider } from 'use-query-params'
import Routers from './routers'

function AppRouter() {
  return (
    <BrowserRouter>
      {/* <QueryParamProvider ReactRouterRoute={Route}> */}
        <div className='page'>
          <Routers />
        </div>
      {/* </QueryParamProvider> */}
    </BrowserRouter>
  )
}

export default AppRouter
