import React from 'react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { createTokenAsnc } from '../../redux/token/tokenApis'
import { tokenType } from '../../redux/token/tokenSlice'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { createOrderAsync } from '../../redux/orders/orederApis'
import { orderType } from '../../redux/orders/orderSlice'
import { RootState } from '../../redux/store'

const adminSales = () => {

    const alltokens = useAppSelector((state:RootState) => state.token.alltokens)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name:"",
            volume:"",
            price:"",
        },
        onSubmit: async (values, { resetForm }) => {
            const newOrder: orderType = {
                name: values.name,
                volume: Number.parseInt(values.volume),
                price: Number.parseInt(values.price),
                orderstime: new Date(Date.now())
            }

            const response = await dispatch(createOrderAsync(newOrder))

            
            if (response.type === "addOrdersAsync/rejected") {
                toast.error("Cannot confirm sale.")
                alert("Cannot confirm sale")
            } else {
                toast.success("Sale confirmed!!")
                alert("Sale confirmed!")

            }
        },
    });

  return (
    <div className="w-full flex flex-col bg-slate-100 border rounded-md shadow-md mt-36 container mx-auto p-5">
          <form className="flex flex-row bg-cyan-200 border rounded-md w-full overflow-auto p-4" onSubmit={formik.handleSubmit}>
              <span className=" justify-end font-semibold ml-3">Token:&nbsp; 
              <input className="text-lg w-40 border rounded-md p-1" type="text" onChange={formik.handleChange} value={formik.values.name} name="name" placeholder='Token Name'></input>
              <select className="text-lg w-40 border rounded-md p-1" value={"0"}>
              </select>
              </span>
              <span className=" justify-end font-semibold ml-3">Count:&nbsp; <input className="text-lg w-40 border rounded-md p-1" type="text" value={formik.values.volume} onChange={formik.handleChange} name="volume" placeholder='Token counts To Sell'></input></span>
              <span className=" justify-end font-semibold ml-3">Price:&nbsp; <input className="text-lg w-40 border rounded-md p-1" type="text" value={formik.values.price} onChange={formik.handleChange} name="price" placeholder='Price of Token'></input></span>
              <input type="submit" className="w-52 align-middle text-lg bg-green-700 hover:bg-green-600 text-white font-semibold rounded-2xl ml-5" value="Confirm Sale"></input>
          </form>
    </div>
  )
}

export default adminSales