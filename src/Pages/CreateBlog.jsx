import React, { useState } from 'react'
import Header from '../Components/Header/Header'
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function CreateBlog() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handleImage = (e)=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      setImage(reader.result)
    }
  }

  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();

      if(!image || !title || !description || !content){
        window.alert("All Fields Are Mandotory")
        return;
      }
      const response = await api.post(ApiRoutes.createBlog.path, {title: title, description: description, image: image, content: content}, {authenticate: ApiRoutes.createBlog.authenticate});
      const {data: responseData} = response;
      if(responseData.success){
        toast.success(responseData.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
    }
  }

  return (
    <>
        <Header/>
        <section className='min-h-[80vh]'>
          <h1 className='px-4 py-2 text-3xl text-center font-bold'>Create Blog</h1>

          <div className='w-full h-full lg:p-4'>
            <form className='grid gap-2'>
              <div className='w-full grid gap-1'>
                <label htmlFor="title" className='font-semibold text-xl'>Title:</label>
                <input type="text" id='title' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} className=' min-w-[40%] bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded'/>
              </div>
              <div className='w-full grid gap-1'>
                <label htmlFor="description" className='font-semibold text-xl'>Description:</label>
                <textarea type="text" id='description' name='description' value={description} onChange={(e)=>setDescription(e.target.value)} className=' min-w-[40%] bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded'/>
              </div>
              <div className='w-full grid gap-1'>
                <label htmlFor="image" className='font-semibold text-xl'>Image:</label>
                <input type="file" id='image' name='image' onChange={handleImage} className=' w-fit px-2 bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded cursor-pointer'/>
              </div>
              <div className='w-full grid gap-1'>
                <label htmlFor="content" className='font-semibold text-xl'>Content:</label>
                <textarea type="text" id='content' name='content' value={content} onChange={(e)=>setContent(e.target.value)} className=' min-w-[40%] bg-blue-50 outline-none focus-within:border border-blue-400 px-1 py-2 rounded'/>
              </div>

              <button className='bg-blue-400 mt-4 py-2 rounded hover:bg-blue-600 hover:text-white font-semibold text-xl' onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </section>
    </>
  )
}

export default CreateBlog