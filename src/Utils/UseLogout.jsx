import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function UseLogout() {
    let navigate = useNavigate();
  return ()=>{
    localStorage.clear()
    toast.success("Logout Successfull")
    navigate('/login')
  }
}

export default UseLogout