import React, { useEffect, useState } from 'react';
import Header from '../Components/Header/Header';
import UseLogout from "../Utils/UseLogout";
import toast from 'react-hot-toast';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';

function Profile() {

  const logout = UseLogout();
  const [data, setData] = useState({
    name: "",
    email: ""
  });

  const fetchUserData = async () => {
    try {
      const response = await api.get(ApiRoutes.getUserDetails.path, {authenticate: ApiRoutes.getUserDetails.authenticate});

      const {data: resposeData} = response;

      if(resposeData.success){
        setData(resposeData.data);
        toast.success(resposeData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
      if(response.data.status == 401){
        logout();
      }
    }
  }
  console.log("Data: ", data);
  useEffect(()=>{
    fetchUserData();
  }, [])
  return (
    <>
      <Header/>
      <section className='min-h-[80vh] w-full flex flex-col justify-around items-center'>
        <h1 className='text-center text-3xl font-semibold w-full'>My Account</h1>
        <div className='lg:min-h-[40vh] lg:min-w-[40vh] flex flex-col gap-3 shadow-lg p-2'>
          <p className='text-blue-700 text-lg font-semibold'>Name: {data.name}</p>
          <p className='text-blue-700 text-lg font-semibold'>Email: {data.email}</p>
          <button onClick={()=>logout()} className='bg-red-500 py-2 px-4 rounded-lg text-white hover:bg-red-800 font-semibold text-lg'>Logout</button>
        </div>
      </section>
    </>
  )
}

export default Profile