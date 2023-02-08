import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBar from '../component/SideBar'
import Add from './Add'
import Edit from './Edit'
import Home from './Home'
import Login from './Login'


const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path={`/`} element={
                <Stack direction="row">
                    <SideBar/>
                    <Home/>
                </Stack>
            }>
        </Route>
            <Route path={`/add`} element={<Add/>}></Route>
            <Route path={`/edit/:id`} element={<Stack direction="row"><SideBar/><Edit/></Stack>}></Route>
            <Route path={`/login`} element={<Login/>}></Route>
        </Routes>
    </>
  )
}

export default AllRoutes