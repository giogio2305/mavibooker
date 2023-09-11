import React from 'react'
import { useState } from 'react'
import ms from '../../assets/microsoft.png'
import gr from '../../assets/grid.png'
import { EyeAlt, EyeClose } from 'iconoir-react'
import { Link } from 'react-router-dom'

function Register() {
    const [pass, setPass] = useState(true)
    document.title = "Mavibooker - Register"
  return (
    <div className="w-full h-[100vh] bg-grid bg-cover bg-center bg-no-repeat flex flex-col p-0 m-0 box-border font-PJS">
    {/* <div className='my-6 w-full flex items-center justify-center text-slate-700 font-semibold text-4xl'>Mavibooker</div> */}
  <div className="w-full flex items-center justify-center mt-7">
    <form className='w-[320px] h-[516px] shadow-md rounded-lg bg-white flex flex-col items-center'>
      <div className='h-[72px] w-[72px] rounded-full bg-gray-200 mt-2.5'></div>
      <h1 className='text-xl font-semibold text-zinc-800 my-1'>Create an account</h1>
      <p className='text-[12px] font-normal text-zinc-800'>Please enter your details to create  an account.</p>
      <div className='w-3/4 flex flex-row items-center justify-center border-[1.82px] border-gray-300 py-1  h-7  mt-4 text-xs font-semibold text-zinc-700 cursor-pointer rounded-lg'>
        <img src={ms} width='20px' height='20px' className='mr-2'/>
        Continue with Microsoft
      </div>
      <div className="relative w-full flex px-8">
        <div className='text-center left-[45%] top-[25%] absolute h-4 w-8 bg-white rounded-md text-zinc-700 font-semibold text-xs'>or</div>
        <hr className='w-full bg-gray-300 my-5 h-[1.6px] rounded-lg'/>
      </div>
      <div className='w-full px-8 flex flex-col items-start mt-2'>
        <label className='font-semibold text-zinc-800 text-[13px]'>Full Name <sup className='font-black text-[#100693]'>*</sup></label>
        <input type='text' placeholder='John Dowe' className='w-full py-1 outline-none rounded-lg text-sm px-2 my-1  h-7 border-[1.82px] border-gray-300'/>
        <p className='hidden font-bold text-red-600 text-[9px]'>The username must contains upper and lower</p>
      </div>

      <div className='w-full px-8 my-1.5 flex flex-col items-start mt-2'>
        <label className='font-semibold text-zinc-800 text-[13px]'>Email Address<sup className='font-black text-[#100693]'>*</sup></label>
        <input type='email' placeholder='johnd@example.com' className='w-full outline-none py-1 rounded-lg text-sm px-2 my-1  h-7 border-[1.82px] border-gray-300'/>
        <p className='hidden mt-1 font-bold text-red-600 text-[9px]'>The username must contains upper and lower</p>
      </div>

      <div className='w-full px-8 flex flex-col items-start mt-2'>
        <label className='font-semibold text-zinc-800 text-[13px]'>Password <sup className='font-black text-[#100693]'>*</sup></label>
        <div className='flex items-center w-full py-1 rounded-lg text-sm px-1.5 my-1  h-7 border-[1.82px] border-gray-300'>
        <input type={pass ?'password':'text'} placeholder='8 + characters' className='h-6 px-2 outline-none w-[92%]'/>
        <div className='h-6 w-6 flex items-center justify-center cursor-pointer ml-1' onClick={()=>{setPass(!pass)}}>
          {pass ? <EyeClose className='w-4 h-4 text-zinc-800'/>: <EyeAlt className='w-4 h-4 text-zinc-800'/>}
        </div>
        </div>
        <p className='hidden mt-1 font-bold text-red-600 text-[9px]'>The username must contains upper and lower</p>
      </div>

      <div className='w-full px-8 flex flex-col items-center mt-0.5'>
        <input type='submit' value="Sign up" className='w-full flex items-center justify-center text-white font-semibold mt-4 py-1 rounded-lg text-[13px] px-2  h-7 bg-[#100693]'/>
        <p className='mt-2 text-zinc-700 text-xs font-medium text-center'>Already have an account ? <Link to='/login' className='font-semibold text-[#100693]'>Sign in</Link></p>
      </div>
    </form>
  </div>
  </div>
  )
}

export default Register