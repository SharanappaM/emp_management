import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmpHamePage = () => {
  const [empData, setEmpData] = useState([])
  const { id } = useParams();
  const navi = useNavigate()
  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get(`http://localhost:5050/emplyoee/details/${id}`)
      .then(res => {
        setEmpData(res.data)
      }).catch(err => {
        console.log(err);

      })
  }, [])

  const handleLogout = ()=>{
    axios.get("http://localhost:5050/emplyoee//logout")
    .then(res=>{
      console.log(res.data);
      if(res.data.Status){
        localStorage.removeItem("valid")
        alert("User loggd out")
        navi("/")

      }
     
      
    }).catch(err=>{
      console.log(err);
      
    })
  }
  return (
    <div>
      EmpHamePage
      {
        empData.map((item, index)=>(
          <>
          <h3>name : {item.name}</h3>
          <h3>email : {item.email}</h3>
          <h3>salary : {item.salary}</h3>
          <h3>address : {item.address}</h3>



          
          </>
        ))
      }

      <button onClick={handleLogout}>Logut</button>
    </div>
  )
}

export default EmpHamePage
