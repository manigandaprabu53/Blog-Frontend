import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from "react-hot-toast";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();

            const response = await api.post(ApiRoutes.forgotPassword.path, {email: email}, {authenticate: ApiRoutes.forgotPassword.authenticate});

            const {data: responseData} = response;

            if(responseData.success){
                navigate("/login");
                toast.success(responseData.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
        }
    }

  return (
    <>
        <h1 className='font-bold text-xl text-[2rem] my-2 text-purple-800'>Bloger Spot</h1>
        <section className='flex items-center justify-center mt-28'>
            <div className='lg:w-[40vw] w-96 border rounded bg-white px-7 py-10'>
                <form className='grid gap-3' onSubmit={handleSubmit}>

                    <h4 className='text-2xl mb-7 w-full text-center'>Forgot Password</h4>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id='email' name='email' value={email} className='bg-blue-50 outline-none focus-within:border border-blue-200 rounded p-2' onChange={(e)=>setEmail(e.target.value)}/>
                    </div>

                    <button type='submit' className='bg-blue-500 mt-4 px-4 py-2 rounded hover:bg-blue-800 hover:text-white'>Send Mail</button>

                    <p className='text-sm text-center mt-4'>Don't have account? <Link to="/register" className="font-medium text-blue-500 underline">Register</Link></p>
                </form>
            </div>
        </section>  
    </>
  )
}

export default ForgotPassword