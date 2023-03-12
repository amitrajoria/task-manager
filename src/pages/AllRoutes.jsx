import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../component/PrivateRoute'
import SideBar from '../component/SideBar'
import Add from './Add'
import Edit from './Edit'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'


const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path={`/`} element={
                <PrivateRoute>
                    <Stack direction="row">
                        <SideBar/>
                        <Home/>
                    </Stack>
                </PrivateRoute>
            }>
        </Route>
            <Route path={`/add`} element={<Add/>}></Route>
            <Route path={`/edit/:id`} element={<PrivateRoute><Stack direction="row"><SideBar/><Edit/></Stack></PrivateRoute>}></Route>
            <Route path={`/login`} element={<Login/>}></Route>
            <Route path={`/signup`} element={<Signup/>}></Route>
        </Routes>
    </>
  )
}

export default AllRoutes