import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header';
import UseLogout from "../Utils/UseLogout";
import api from "../Service/ApiService";
import ApiRoutes from '../Utils/ApiRoutes';
import MyBlogCard from "../Components/MyBlogCard";
import toast from 'react-hot-toast';

function MyBlogs() {

  const [data, setData] = useState([]);
  const logout = UseLogout();

  const fetchMyBlogs = async () => {
    try {

      const response = await api.get(ApiRoutes.getMyBlogs.path, {authenticate: ApiRoutes.getMyBlogs.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        setData(responseData.data);
        toast.success(responseData.message);
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
      if(error.response.status == 401){
        logout();
      }
    }
  }
  console.log("My Blogs: ", data)
  useEffect(()=>{
    fetchMyBlogs();
  }, [])

  return (
    <>
      <Header/>
      <section className='min-h-[90vh] bg-blue-50'>
        <h1 className='text-3xl font-semibold text-center p-5'>My Blogs</h1>

        <div className='w-full h-full lg:p-4 flex flex-col justify-center items-center flex-wrap gap-4 mt-5'>
          {
            data.length ? (
              data.map((e, i)=>{
                return(

                  <MyBlogCard key={i} data={e} fetchMyBlogs={fetchMyBlogs}/>
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

export default MyBlogs