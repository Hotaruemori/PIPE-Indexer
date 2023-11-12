import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, useAppDispatch, useAppSelector } from '../../redux/store'
import { getTokensAsync } from '../../redux/token/tokenApis'
import { toast, ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import { createOrderAsync } from '../../redux/orders/orederApis'
import { orderType } from '../../redux/orders/orderSlice'
import { RootState } from '../../redux/store'

const adminSales = () => {

    const alltokens = useSelector((state:RootState) => state.token.alltokens)
    const dispatch:AppDispatch = useDispatch()
    const [name, setName] = useState("")

    useEffect(() => {
      dispatch(getTokensAsync())
    }, [dispatch])

    const setT = (val:string) => {
      setName(val)
    }

    const formik = useFormik({
        initialValues: {
            volume:"",
            price:"",
        },
        onSubmit: async (values, { resetForm }) => {
            const ordertime = Date.now()
            console.log(ordertime)

            const newOrder: orderType = {
                name: name,
                volume: Number.parseInt(values.volume),
                price: Number.parseFloat(values.price),
                orderstime: ordertime
            }

            console.log(newOrder)
            const response = await dispatch(createOrderAsync(newOrder))

            const errormsg = localStorage.getItem('error')
            if(errormsg && errormsg.length !== 0 || response.type === 'addOrdersAsync/rejected')
            {
                await toast.error(errormsg)
            }
            else
            {
                await toast.success("Sale confirmed!")
            }
        },
    })

  return (
    <>
    <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored" />
        <div className="dark:bg-slate-700">
          <div className="w-full flex flex-col bg-slate-100 dark:bg-slate-800 rounded-md shadow-md mt-36 container mx-auto p-5">
              <form className="flex flex-row bg-cyan-200 dark:text-white rounded-md w-full overflow-auto p-4 dark:bg-slate-800" onSubmit={formik.handleSubmit}>
                  <span className=" justify-end font-semibold ml-6">Token:&nbsp; 
                  <select className="text-lg w-52 border rounded-md p-1 overflow-y-auto dark:text-black" placeholder="Select token name" value={name} onChange={(e) => setT(e.target.value)} name="name">
                    <option className="overflow-y-scroll" value="" hidden></option>
                      {alltokens.map((item, index) => (
                          <option className="overflow-y-scroll" key={index} value={item.name}>{item.name}</option>
                      )) 
                      }
                  </select>
                  </span>
                  <span className=" justify-end font-semibold ml-6">Count:&nbsp; <input className="text-lg w-52 dark:text-black border rounded-md p-1" type="text" value={formik.values.volume} onChange={formik.handleChange} name="volume" placeholder='Token counts To Sell'></input></span>
                  <span className=" justify-end font-semibold ml-6">Price:&nbsp; <input className="text-lg w-52 dark:text-black border rounded-md p-1" type="text" value={formik.values.price} onChange={formik.handleChange} name="price" placeholder='Price of Token'></input></span>
                  <input type="submit" className="w-52 align-middle text-lg bg-green-700 hover:bg-green-600 text-white font-semibold rounded-2xl ml-10" value="Confirm Sale"></input>
              </form>
        </div>
      </div>
    </>
  )
}

export default adminSales