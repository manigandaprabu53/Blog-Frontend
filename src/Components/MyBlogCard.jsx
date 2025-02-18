import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import UseLogout from '../Utils/UseLogout';

function MyBlogCard({data, fetchMyBlogs}) {

  const navigate = useNavigate();
  const logout = UseLogout();

  const deleteBlog = async ()=>{
    try {
      const response = await api.delete(`${ApiRoutes.deleteBlog.path}/${data._id}`, {authenticate: ApiRoutes.deleteBlog.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        fetchMyBlogs();
        toast.success(responseData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
      if(error.response.status == 401){
        logout();
      }
    }
  }

  return (
    <div className='min-w-[300px] lg:max-w-[400px] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105'>
        <img src={data.image} alt="Thumbnail" className='w-full h-48 object-scale-down'/>
        <div className='p-4'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>{data.title}</h3>
            <p className='text-gray-600 text-sm mb-4'>{data.description}</p>
            <div className='grid gap-3'>
                <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors' onClick={()=>navigate(`/viewblog/${data._id}`)}>View</button>
                <button className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors' onClick={()=>navigate(`/editblog/${data._id}`)}>Edit</button>
                <button className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors' onClick={deleteBlog}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default MyBlogCard