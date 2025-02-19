import React, { useEffect, useState } from 'react'
import Header from "../Components/Header/Header";
import { useParams } from 'react-router-dom';
import api from "../Service/ApiService";
import ApiRoutes from '../Utils/ApiRoutes';
import toast from "react-hot-toast"
import UseLogout from '../Utils/UseLogOut';

function View() {

  const param = useParams();
  const logout = UseLogout();
  const [data, setData] = useState({});

  const fetchBlogData = async ()=>{
    try {

      const response = await api.get(`${ApiRoutes.getBlogById.path}/${param.id}`, {authenticate: ApiRoutes.getBlogById.authenticate})

      const {data: responseData} = response;

      if(responseData.success){
        setData(responseData.data);
        toast.success(responseData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured! Please Try Again")
      if(error.response.status == 401){
        logout();
      }
    }
  }

  useEffect(()=>{
    fetchBlogData();
  }, [])

  return (
    <>
    <Header/>
    <section>
      <div className='grid gap-4'>
        <h1 className='text-center my-5 font-bold text-4xl'>{data.title}</h1>
        <div className='w-full max-h-[35vh] p-1'>
          <img src={data.image} alt="Blog Thumbnail" className='object-scale-down max-h-[35vh] w-full'/>
        </div>
        <div className='px-3 text-slate-600 text-xl'>
          <p>{data.content}</p>
        </div>
      </div>
    </section>
    </>
  )
}

export default View