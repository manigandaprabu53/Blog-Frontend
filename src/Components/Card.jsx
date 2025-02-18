import React from 'react'
import { useNavigate } from 'react-router-dom';

function Card({data}) {

  const navigate = useNavigate();

  return (
    <div className='min-w-[300px] lg:max-w-[400px] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105'>
        <img src={data.image} alt="Thumbnail" className='w-full h-48 object-scale-down'/>
        <div className='p-4'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>{data.title}</h3>
            <p className='text-gray-600 text-sm mb-4'>{data.description}</p>
            <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors' onClick={()=>navigate(`/viewblog/${data._id}`)}>View</button>
        </div>
    </div>
  )
}

export default Card