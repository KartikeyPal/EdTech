import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { ContactUsEndpoints } from '../../services/apis';
import CountryCode from '../../../data/countrycode.json'
function ContactUsForm() {
    const [loading, setLoading] = useState(false);  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors , isSubmitSuccessful},
      } = useForm();

      useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                message:"",
                firstName:"",
                lastName:"",
                phoneNo:"",
            })
        }
      },[isSubmitSuccessful,reset]);
      async  function  submitContactFrom(data){
       console.log("logging data",data);
        try {
            setLoading(true);
            // const res = await apiConnector("POST",ContactUsEndpoints.CONTACT_US_API,data);
            const res = {status: "OK"};
            console.log("logging response",res);
            setLoading(false);
        } catch (error) {
                console.log("Error : ", error.message);
                setLoading(false);
        }

      }
  return (
    <div>
        <form onSubmit={handleSubmit(submitContactFrom)} className=''>
            <div className='flex flex-col gap-x-5 mb-10'>
                <div className='flex gap-x-5 mb-5'>
                    <div className='flex flex-col gap-y-1'>

                        <label htmlFor='firstName'>First Name</label>
                        <input 
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder='Enter First name'
                            className='text-richblack-25 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-lg'
                            {...register("firstName",{required:true})}
                        />
                        {
                            errors.firstName && (<span>Please enter your name</span>)
                        }
                    </div>
                    <div className='flex flex-col gap-y-1 mb-5'>

                        <label htmlFor='lastName'>Last Name</label>
                        <input 
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder='Enter Last name'
                             className='text-richblack-25 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-lg'
                            {...register("lastName",{required:false})}
                        />
                        {
                            errors.lastName && (<span>Please enter your name</span>)
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-y-1 mb-5'>
                    <label htmlFor='Email'>Email</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Enter Email address'
                             className='text-richblack-25 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-lg'
                            {...register("email",{required:true})}
                        />
                        {
                            errors.email && (<span>Please enter your email</span>)
                        }
                    </div>
                    {/* phoneNo */}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="phonenumber">Phone Number</label>
                       
                        <div className='flex flex-row gap-5'>
                             {/* country code dropdown */}
                                <select name="dropdown" id="dropdown"  className='w-[69px]  text-richblack-25 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-lg' {...register("countrycode",{required: true})} >
                                    {
                                        CountryCode.map((ele,ind)=>(
                                            <option value={ ele.code} key={ind} className='hover:bg-caribbeangreen-300'>{ele.code} - {ele.country}</option>
                                        ))
                                    }
                                </select>
                     
                            {/* phone nunber */}
                                <input 
                                    type='number'
                                    name='phonenumber'
                                    id='phonenumber'
                                    placeholder='12345 67890'
                                     className='text-richblack-25 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                    {...register('phonenumber',{
                                        required:{value: true, message: "Invalid phone number"},
                                        maxLength:{value:10,message:"invalid phone number"},
                                        minLength:{value: 8, message:"invalid phone number"}
                                    })}
                                />
                  
                        </div>
                        {
                            errors.phonenumber   && (
                                <span>{errors.phonenumber.message}</span>
                            )
                        }
                    </div>
                    {/* message box */}
                    <div className='flex flex-col mb-5 gap-2 mt-6'>
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            cols={30}
                            rows={7}
                            placeholder='Enter your Message'
                            className='text-richblack-25 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-lg' 
                            {...register("message",{required: true})}   
                        />
                        {
                            errors.message && (<span>Please Enter Your Message</span>)
                        }
                    </div>
                    <button type='submit' className='bg-yellow-5 text-richblack-900 p-2 rounded-lg hover:scale-95 transition-all delay-100 '>Send Message</button>
            </div>
        </form>
    </div>
  )
}

export default ContactUsForm
