import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
const Schema=z.object({
  email : z.string().email({message: "Please enter a valid email"}),
  password : z.string()//.regex(new RegExp("^?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"),'please enter valid password')
})
const Login = () => {
  const {handleSubmit,register,formState:{errors}} = useForm<{email: string;password: string}>({
    resolver:zodResolver(Schema)
  })
  const handleLogin= (data:any)=>{
    console.log(data);
    
    }
  return (
    <div>
        <form onSubmit={handleSubmit(handleLogin)} className='login-form'>
          <input  {...register('email')} />
          {errors.email && <b className='error'>{errors.email.message}</b>}
          <input type="password" {...register('password')} />
          {errors.password && <b className='error'>{errors.password.message}</b>}
          <input type="submit" value='Login' />
        </form>
    </div>
  )
}

export default Login