import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
const protectedRoute = ({component: Component, ...rest}) =>(
    <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)


function mapStateToProps({teacher}) {
    return {
        isAuthenticated: teacher.isAuthenticated
    }
}
export default connect(mapStateToProps, null)(protectedRoute)
