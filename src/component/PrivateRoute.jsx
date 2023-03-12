import React from 'react'
import { useSelector } from 'react-redux'

const PrivateRoute = ({children}) => {

    const isAuth = useSelector((store) => store.AuthReducer.isAuth);

    if(!isAuth)
        return ;

  return (
    children
  )
}

export default PrivateRoute