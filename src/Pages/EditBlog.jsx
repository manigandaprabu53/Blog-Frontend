import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import UseLogout from '../Utils/UseLogout';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import Header from '../Components/Header/Header';

function EditBlog() {

    const navigate = useNavigate();
    const param = useParams();
    const logout = UseLogout();

    const [data, setData] = useState({
        title: "",
        description: "",
        image: "",
        content: ""
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;

        setData((prev)=>{
            return {
            ...prev,
            [name]: value
            }
        })
    }

    const handleImage = (e)=>{
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            setData((prev)=>{
                return {
                    ...prev,
                    image: reader.result
                }
            })
        }
    }

    const fetchEditBlogData = async () => {
        try {
            
            const response = await api.get(`${ApiRoutes.getBlogById.path}/${param.id}`, {authenticate: ApiRoutes.getBlogById.authenticate});

            const {data: responseData} = response;

            if(responseData.success){
                setData(responseData.data);
                toast.success(responseData.message);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
            if(error?.response?.status == 401){
                logout();
            }
        }
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            const response = await api.put(ApiRoutes.updateBlog.path, data, {authenticate: ApiRoutes.updateBlog.authenticate});
            const {data: responseData} = response;
            console.log("Response: ", response)
            if(responseData.success){
                navigate("/")
                toast.success(responseData.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
            if(error?.response?.status == 401){
                logout();
            }
        }
    }
    
    useEffect(()=>{
        fetchEditBlogData();
    }, [])

  return (
    <>
        <Header/>
        <section className='min-h-[80vh]'>
          <h1 className='px-4 py-2 text-3xl text-center font-bold'>Edit Blog</h1>

          <div className='w-full h-full lg:p-4'>
            <form className='grid gap-2' onSubmit={handleUpdate}>
              <div className='w-full grid gap-1'>
                <label htmlFor="title" className='font-semibold text-xl'>Title:</label>
                <input type="text" id='title' name='title' value={data.title} onChange={handleChange} className=' min-w-[40%] bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded'/>
              </div>
              <div className='w-full grid gap-1'>
                <label htmlFor="description" className='font-semibold text-xl'>Description:</label>
                <textarea type="text" id='description' name='description' value={data.description} onChange={handleChange} className=' min-w-[40%] bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded'/>
              </div>
              <div className='w-full grid gap-1'>
                <label htmlFor="image" className='font-semibold text-xl'>Image:</label>
                <input type="file" id='image' name='image' onChange={handleImage} className=' w-fit px-2 bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded cursor-pointer'/>
                {
                    data.image && (
                        <img src={data.image} alt="Thumbnail" className='w-[150px] h-[150px] object-scale-down'/>
                    )
                }
              </div>
              <div className='w-full grid gap-1'>
                <label htmlFor="content" className='font-semibold text-xl'>Content:</label>
                <textarea type="text" id='content' name='content' value={data.content} onChange={handleChange} className=' min-w-[40%] bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded'/>
              </div>

              <button className='bg-blue-400 mt-4 py-2 rounded hover:bg-blue-600 hover:text-white font-semibold text-xl'>Update</button>
            </form>
          </div>
        </section>
    </>
  )
}

export default EditBlog