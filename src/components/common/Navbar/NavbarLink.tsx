import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

interface NavbarLinkProps {
    active: boolean,
    linkName: string,
    linkURL: string
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({active, linkName, linkURL}) => {
  return (
    <Link to={linkURL} className={classnames("block align-middle h-14 text-xl ml-5 px-10 py-3 cursor-pointer rounded-full shadow-lg dark:shadow-indigo-500 transition ease-in-out  hover:-translate-y-1 duration-150 font-sans", {"bg-blue-500 dark:bg-cyan-500 hover:-translate-y-1 hover:bg-indigo-500 text-white": active, "bg-none dark:text-white hover:bg-slate-300 text-slate-700 z-50": !active})}>{linkName}</Link>
  )
}
