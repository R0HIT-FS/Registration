import Link from 'next/link'
import React from 'react'

const OverlayMenu = ({isOpen,toggleNavbar}) => {
  return (
    <div className={`transition w-full h-screen bg-[#09090B] absolute top-0 left-0 z-[101] ${isOpen ? "open":"overlaymenu"}`}>
            <div className="flex w-full p-5 justify-between items-center md:px-10" >
        <div className="text-3xl font-bold uppercase text-white"><h1>registration</h1></div>
        <div>
            <button className="font-normal text-white" onClick={toggleNavbar}>Close</button>
        </div>
    </div>
        <div className='p-4 flex flex-col items-center justify-center w-full h-2/3 gap-3'>
        <Link href={"/"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter text-white'>Grid View</Link>
        <Link href={"/table"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter text-white'>Table view</Link>
        <Link href={"/add-member"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter text-white'>Add A Member</Link>
        <Link href={"/filter?minAge=1&maxAge=100"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter text-white'>Filter By Age</Link>
        <Link href={"/drop"} onClick={toggleNavbar} className='text-red-500 hover:underline text-xl font-semibold uppercase tracking-tighter'>Delete all data</Link>
        </div>
    </div>
  )
}

export default OverlayMenu