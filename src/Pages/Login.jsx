import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../Components/PasswordInput';
import {validateEmail} from "../Utils/helper.js"
import api from "../Service/ApiService.jsx";
import ApiRoutes from '../Utils/ApiRoutes.jsx';
import toast from "react-hot-toast"

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!validateEmail(email)) {
        setError("Please enter valid email");
        return;
    }

    if(!password) {
        setError("Please enter password");
        return;
    }

    setError("");
    try {
        
        const response = await api.post(ApiRoutes.Login.path, {email: email, password: password}, {authenticate: ApiRoutes.Login.authenticate});
        const {data: responseData} = response;
        
        if(responseData.success){
            localStorage.setItem("accessToken", responseData.data);
            navigate("/")
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
                <form onSubmit={handleSubmit} className='grid gap-3'>

                    <h4 className='text-2xl mb-7 w-full text-center'>Register</h4>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id='email' name='email' value={email} className='bg-blue-50 outline-none focus-within:border border-blue-200 rounded p-2' onChange={(e)=>setEmail(e.target.value)}/>
                    </div>

                    <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='bg-blue-500 mt-4 px-4 py-2 rounded hover:bg-blue-800 hover:text-white'>Submit</button>

                    <p className='text-sm text-center mt-4'>Don't have account? <Link to="/register" className="font-medium text-blue-500 underline">Register</Link></p>
                    <Link to={"/forgot-password"} className='text-center text-blue-600 hover:text-blue-500'>Forgot Password</Link>
                </form>
            </div>
        </section>  
    </>
  )
}

export default Login