import React from 'react'
import { Link } from 'react-router-dom'

type ListingProps= {
  title:string,
  id:string,
  DeletingListing:any,
  image:string
}

export default function Listing({title,DeletingListing,id,image}:ListingProps) {
  return (
   <>
   <div className='flex items-center justify-between max-w-[450px] min-w-[300px] mx-auto gap-4 border border-gray-500 mt-4 rounded-[6px] p-4'>
    <div className='w-[100px]'>
        <img
        className='rounded-[2px]'
        src={image} alt="pic" />
    </div>
    <div className='flex-1 justify-between flex items-center'>
       <Link to={`/listing/${id}`}>
       <h1 className='font-black text-black hover:underline truncate '>
{title}
        </h1>
       </Link>
<div className='flex flex-col justify-end'>
        <button onClick={()=>{DeletingListing(id)}} className='text-red-800 cursor-pointer hover:underline '>Delete</button>
        <Link to={`/listing-update/${id}`} ><button className='text-green-800 cursor-pointer hover:underline'>Edit</button></Link>
    </div>
    </div>
    
   </div>
   </>
  )
}
