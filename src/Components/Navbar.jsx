import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='flex justify-between bg-violet-900 py-2 px-5 w-full'>
            <div className="logo">
                <span className='font-bold text-white text-xl mx-9 '>iTask</span>
            </div>
            <ul className='flex gap-4 text-white mx-9' >
                <li className='font-semibold cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
                <li className='font-semibold cursor-pointer hover:font-bold transition-all duration-75'>Tasks</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar