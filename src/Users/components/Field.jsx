import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BinFull, EyeAlt, EyeClose } from 'iconoir-react'
function Field({label, type, pldr, hlpt, forgot}) {
    const [pass, setPass] = useState(true)
  return (
    <>
{type === "password" ?
    <div className='w-full px-8 flex flex-col items-start mt-2'>
    <label className='font-semibold text-zinc-800 text-[13px]'>Password <sup className='font-black text-[#100693]'>*</sup></label>
    <div className='flex items-center w-full py-1 rounded-lg text-sm px-1.5 my-1  h-7 border-[1.82px] border-gray-300'>
    <input type={pass ?'password':'text'} placeholder='8 + characters' className='h-6 px-2 outline-none w-[92%]'/>
    <div className='h-6 w-6 flex items-center justify-center cursor-pointer ml-1' onClick={()=>{setPass(!pass)}}>
      {pass ? <EyeClose className='w-4 h-4 text-zinc-800'/>: <EyeAlt className='w-4 h-4 text-zinc-800'/>}
    </div>
    </div>
    <p className='hidden mt-1 font-bold text-red-600 text-[9px]'>The username must contains upper and lower</p>
    {forgot ? <div className='w-full flex justify-end mt-2'><Link to='/forgot' className='font-semibold text-zinc-700 text-[12px] underline'>Forgot password?</Link></div>: null}
  </div>
    :
    <div className='w-full px-8 flex flex-col items-start mt-2'>
    <label className='font-semibold text-zinc-800 text-[13px]'>{label} <sup className='font-black text-[#100693]'>*</sup></label>
    <input type={type} placeholder={pldr} className='w-full py-1 outline-none rounded-lg text-sm px-2 my-1  h-7 border-[1.82px] border-gray-300'/>
    <p className='hidden font-bold text-red-600 text-[9px]'>{hlpt}</p>
    </div>
}
</>
  )
}

export default Field