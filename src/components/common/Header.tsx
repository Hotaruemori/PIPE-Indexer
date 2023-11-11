import React from 'react'
import classnames from 'classnames'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NavbarLink } from './Navbar/NavbarLink';
import { logOut } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/store';
//import tw from "twin.macro";
//"block align-middle h-14 text-xl ml-5 px-10 py-3 cursor-pointer rounded-full shadow-lg dark:shadow-indigo-500 transition ease-in-out bg-blue-500 dark:bg-cyan-500 hover:-translate-y-1 hover:bg-indigo-500 duration-150 text-white font-sans"

const isAuthenticated = localStorage.getItem("user") ? true : false


const Header = () => {
  const path = useLocation().pathname
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSign = () => {
    if(isAuthenticated)
    {
      dispatch(logOut()) 
    }
    
    navigate("/")

    window.location.reload()
  }
  
  return (
    <div className="w-full fixed flex top-0 h-32 rounded-md border-none items-center bg-white dark:bg-slate-800 shadow-md font-semibold">
      <>
      {
        path.includes('admin') ? <>
          <NavbarLink active={path == "/admin/tokens"} linkName="Edit Tokens" linkURL="/admin/tokens" />
          <NavbarLink active={path == "/admin/sales"} linkName="Confirm Sales" linkURL="/admin/sales" />
        </> : <>
        <NavbarLink active={path == "/homePage"} linkName="Home" linkURL="/homePage" />
        <NavbarLink active={path == "/recentOrders"} linkName="RecentOrders" linkURL="/recentOrders" /></>
      }

      <div className='fixed w-full justify-end flex'>
        <button onClick={(e) => handleSign()} className="mr-10 text-2xl bg-none border-b-2 border-slate-800 text-right">{ isAuthenticated ? "Sign Out" : "Sign In"}</button>
      </div>
      
      </>
    </div>
  )
};


export default Header;