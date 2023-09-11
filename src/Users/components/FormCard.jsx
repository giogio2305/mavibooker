import React from 'react'
import { useState } from 'react'
import ms from '../../assets/microsoft.png'
import gr from '../../assets/grid.png'
import { EyeAlt, EyeClose } from 'iconoir-react'
import { Link } from 'react-router-dom'
function FormCard({title, subtitle, isOauth, children, isSubmit, submit, reditext, linkpath, link}) {
  return (
    <div className="w-full flex items-center justify-center mt-7">
        <form className='w-[320px] h-[516px] shadow-md rounded-lg bg-white flex flex-col items-center'>
        <div className='h-[72px] w-[72px] rounded-full bg-gray-200 mt-2.5'></div>
        <h1 className='text-xl font-semibold text-zinc-800 my-1'>{title}</h1>
        <p className='text-[12px] font-normal text-zinc-800'>{subtitle}</p>
        { isOauth ?  
        // Oauth microsoft button    
        <div className='w-3/4 flex flex-row items-center justify-center border-[1.82px] border-gray-300 py-1  h-7  mt-4 text-xs font-semibold text-zinc-700 cursor-pointer rounded-lg'>
        <img src={ms} width='20px' height='20px' className='mr-2'/>
        Continue with Microsoft
        </div>
        : 
        null
        }
      <div className="relative w-full flex px-8">
      <div className='text-center left-[45%] top-[25%] absolute h-4 w-8 bg-white rounded-md text-zinc-700 font-semibold text-xs'>or</div>
      <hr className='w-full bg-gray-300 my-5 h-[1.6px] rounded-lg'/>
        </div>
        {children}
        {isSubmit ? 
              <div className='w-full px-8 flex flex-col items-center mt-0.5'>
              <input type='submit' value={submit} className='w-full flex items-center justify-center text-white font-semibold mt-4 py-1 rounded-lg text-[13px] px-2  h-7 bg-[#100693]'/>
              <p className='mt-2 text-zinc-700 text-xs font-medium text-center'>{reditext} <Link to={linkpath} className='font-semibold text-[#100693]'>{link}</Link></p>
                </div>
                :null
        }
        </form>
    </div>
  )
}

export default FormCard