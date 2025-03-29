import React, { useEffect } from 'react'
import Loginpage from './components/pages/Loginpage'
import Dashboard from './components/layouts/Dashboard'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/pages/Home'
import ManageEmployees from './components/pages/ManageEmployees'
import Category from './components/pages/Category'
import EmployeePage from './components/pages/employeePages/EmployeePage'
import EmpHamePage from './components/pages/employeePages/EmpHamePage'
import axios from 'axios'
import PrivateRoute from './components/PrivateRoute'

const App = () => {



  return (
    <div>

      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/employeePage' element={<EmployeePage />}>
          
        </Route>
        <Route path='/empdetails/:id' element={
          
          <PrivateRoute>
            <EmpHamePage />
          </PrivateRoute>
          } />

        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />} />
          <Route path='manageEmployees' element={<ManageEmployees />} />
          <Route path='category' element={<Category />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
