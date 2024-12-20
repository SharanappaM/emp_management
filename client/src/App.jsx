import React from 'react'
import Loginpage from './components/pages/Loginpage'
import Dashboard from './components/layouts/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import ManageEmployees from './components/pages/ManageEmployees'
import Category from './components/pages/Category'
import EmployeePage from './components/pages/employeePages/EmployeePage'
import EmpHamePage from './components/pages/employeePages/EmpHamePage'

const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/employeePage' element={<EmployeePage/>}>
        <Route path='' element={<EmpHamePage/>}/>
        </Route>

        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />} />
          <Route path='manageEmployees' element={<ManageEmployees />} />
          <Route path='category' element={<Category />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
