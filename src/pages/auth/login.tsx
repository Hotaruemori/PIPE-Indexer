import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link }  from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useFormik } from 'formik'
import { loginUserAsync } from '../../redux/auth/authApis'
import { userType } from '../../redux/auth/authSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginSchema } from '../../validation/validationLogin'
import DarkModeSwitcher from '../../components/common/DarkModeSwitcher'


const LoginPage = () => {
    const dispatch:AppDispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username:"",
            password:"",
        },
        onSubmit: async (values, { resetForm }) => {
            const newUser: userType = {
                username: values.username,
                password: values.password,
            }
            
            const response = await dispatch(loginUserAsync(newUser))
            localStorage.removeItem('error')
            if(localStorage.length !== 0)
            {
                toast.success("Login Success!")
                setTimeout(() => {
                    const curUser = JSON.parse(localStorage.getItem("user")!)
                    if(curUser.username !== "admin")
                        navigate("/")
                    else
                        navigate("/admin/tokens")
                }, 3000)
            }
            else
            {
                toast.warning("Unregisterd or Login Failed!")
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
            
        },
        validationSchema: loginSchema
    });


  return (
    <>
    <ToastContainer position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored" />
    <div className="dark:bg-slate-700">
        <form className="w-[500px] bg-sky-500 dark:bg-sky-200 p-4 items-center font-semibold font-sans mx-auto justify-center mt-40 flex flex-col shadow-lg shadow-blue-400" onSubmit={formik.handleSubmit}>
            <DarkModeSwitcher />
            <span className="text-center w-3/4 bg-none text-4xl text-white dark:text-indigo-600 border-b border-white dark:border-indigo-600 py-6 px-10 mt-3">Login</span>
            <div className="grid grid-cols-2 h-8 w-full text-lg overflow-none mt-10 ">
                <span className=" text-right text-white dark:text-indigo-600 px-5 mr-6 py-2 text-xl">Username:</span>
                <input className="border shadow-md shadow-slate-500 rounded-md mr-10 p-2" type="text" name="username" value={formik.values.username} onChange={formik.handleChange}/>
            </div>
            <span className="text-right mt-5 px-14 text-sm text-red-700 w-full">{formik.errors.username?formik.errors.username:""}</span>
            <div className="grid grid-cols-2 h-8 w-full text-lg overflow-none mt-10">
                <span className="text-white dark:text-indigo-600 text-right px-5 mr-6 py-2 text-xl">Password:</span>
                <input className="border shadow-md shadow-slate-500 rounded-md mr-10 p-2" type="password" name="password" value={formik.values.password} onChange={formik.handleChange}/>
            </div>
            <span className="text-right mt-5 px-14 text-sm text-red-700 w-full">{formik.errors.password?formik.errors.password:""}</span>
            
            <button className="bg-indigo-700 text-white py-3 px-4 rounded-md shadow-md shadow-indigo-400 text-xl mb-6 mt-10" type="submit">Login</button>
            
            <Link to="/register" className="bg-none text-indigo-800 border-b-2 border-indigo-800 py-1 px-4 text-md mb-6 mt-1">Create Account</Link>
            
        </form>
    </div>
    </>
  )
}

export default LoginPage