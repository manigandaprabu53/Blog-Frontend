import React, { useEffect, useState } from 'react'
import Header from "../Components/Header/Header";
import api from "../Service/ApiService";
import ApiRoutes from "../Utils/ApiRoutes";
import Card from '../Components/Card';
import toast from "react-hot-toast";
import UseLogout from "../Utils/UseLogout";

function Home() {

  const [data, setdata] = useState([]);
  const logout = UseLogout();

  const fetchBlogs = async ()=>{
    try {

      const response = await api.get(ApiRoutes.getAllBlogs.path, {authenticate: ApiRoutes.getAllBlogs.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        setdata(responseData.data)
        toast.success(responseData.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
      if(error.response.status == 401){
        logout();
      }
    }
  }

  useEffect(()=>{
    fetchBlogs();
  }, [])


  return (
    <>
      <Header/>
      <section className='min-h-[90vh] bg-blue-50'>
        <h1 className='text-3xl font-semibold text-center'>Blogs</h1>

        <div className='w-full h-full lg:p-4 flex justify-center items-center flex-wrap gap-4 mt-5'>
          {
            data.length ? (
              data.map((e, i)=>{
                return(

                  <Card key={i} data={e}/>
                )
              })
            ) : (
              <>
                <h1 className='mx-auto text-center font-bold text-4xl'>No Blogs Available.</h1>
              </>
            )
          }
        </div>
      </section>
    </>
  )
}

export default Home