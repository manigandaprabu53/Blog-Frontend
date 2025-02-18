import React, { useState } from 'react'
import PasswordInput from '../Components/PasswordInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from "react-hot-toast";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const param = useParams();
    console.log("ID: ", param.id)
    const handleReset = async (e)=>{
        try {
            e.preventDefault();

            if(!password){
                setError("Enter Password");
                return
            }

            setError("");

            const response = await api.post(`${ApiRoutes.resetPassword.path}/${param.id}`, {password: password}, {authenticate: ApiRoutes.resetPassword.authenticate});

            const {data: responseData} = response;

            if(responseData.success){
                navigate("/login");
                toast.success(responseData.message);
            }


        } catch (error) {
            console.log("Error: ", error)
            toast.error(error?.response?.data?.message || "Error Occured! Please Try Again");
        }
    }

  return (
    <>
        <h1 className='font-bold text-xl text-[2rem] my-2 text-purple-800'>Bloger Spot</h1>
        <section className='flex items-center justify-center mt-28'>
            <div className='lg:w-[40vw] w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handleReset} className='grid gap-3'>

                    <h4 className='text-2xl mb-7 w-full text-center'>Register</h4>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="password">Password:</label>
                        <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>

                    

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='bg-blue-500 mt-4 px-4 py-2 rounded hover:bg-blue-800 hover:text-white'>Reset</button>

                    <p className='text-sm text-center mt-4'>Back to <Link to="/login" className="font-medium text-blue-500 underline">Login</Link></p>
                </form>
            </div>
        </section>  
    </>
  )
}

export default ResetPassword