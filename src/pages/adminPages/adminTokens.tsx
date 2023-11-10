import React from 'react'
import { useState } from 'react'
import { useAppDispatch } from '../../redux/store'
import { createTokenAsnc } from '../../redux/token/tokenApis'
import { tokenType } from '../../redux/token/tokenSlice'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

const adminTokens = () => {

    const dispatch = useAppDispatch()

    const [showAddForm, setShowAddForm] = useState(false)

    const formik = useFormik({
        initialValues: {
            name:"",
            pid:"",
            maxval:"",
            limit:"",
            price: 1
        },
        onSubmit: async (values, { resetForm }) => {
            const newToken: tokenType = {
                name: values.name,
                pid: Number.parseInt(values.pid),
                maxval: Number.parseInt(values.maxval),
                limit: Number.parseInt(values.limit),
                price: 1
            }

            const response = await dispatch(createTokenAsnc(newToken))

            
            if (response.type === "addTokenAsync/rejected") {
                toast.error("Cannot create token.")
                alert("Cannot create token")
            } else {
                toast.success("Token created!")
                alert("Token created!")

            }
        },
    });

  return (
    <div className="w-full flex flex-col bg-slate-100 border rounded-md shadow-md mt-36 container mx-auto p-5">
        <button className="w-32 text-lg m-3 px-4 py-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-2xl" onClick={() => {setShowAddForm(!showAddForm)}}>{showAddForm?"Hide":"Add New+"}</button>
        {showAddForm && (
            <form className="flex flex-row bg-cyan-200 border rounded-md w-full overflow-auto p-4" onSubmit={formik.handleSubmit}>
                <span className=" justify-end font-semibold ml-3">Name:&nbsp; <input className="text-lg w-40 border rounded-md p-1" type="text" onChange={formik.handleChange} value={formik.values.name} name="name" placeholder='Token Name'></input></span>
                <span className=" justify-end font-semibold ml-3">PID:&nbsp; <input className="text-lg w-40 border rounded-md p-1" type="text" value={formik.values.pid} onChange={formik.handleChange} name="pid" placeholder='Token PID'></input></span>
                <span className=" justify-end font-semibold ml-3">Max Value:&nbsp; <input className="text-lg w-40 border rounded-md p-1" type="text" value={formik.values.maxval} onChange={formik.handleChange} name="maxval" placeholder='Max Value'></input></span>
                <span className=" justify-end font-semibold ml-3">Limit:&nbsp; <input className="text-lg w-40 border rounded-md p-1" type="text" value={formik.values.limit} onChange={formik.handleChange} name="limit" placeholder='Limit'></input></span>
                <input type="submit" className="w-52 align-middle text-lg bg-green-700 hover:bg-green-600 text-white font-semibold rounded-2xl ml-5" value="Add Token"></input>
            </form>
        )}
    </div>
  )
}

export default adminTokens