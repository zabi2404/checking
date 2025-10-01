import { useState } from 'react';
import Input from '../Input/Input'

// React icons
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

export default function Navbar() {

  const [Click, setClick] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user)
  console.log(currentUser);
  return (
    <>
      <>

        <div className='flex py-6  bg-[#E2E8F0] transition-all duration-500
xxsm:px-2 xxsm:flex-col gap-4 xsm:justify-start xsm:items-start
sm:px-4
md:px-6 md:flex-row md:items-center md:justify-between
'>
          <div className='font-bold flex 
          
    xxsm:justify-between  xsm:items-center xsm:w-[100%]
   md:w-auto
    '>

            <Link to="/"><h1> Real<span className='text-gray-400'>Estate</span></h1></Link>

            <RxHamburgerMenu className='md:hidden cursor-pointer'
              onClick={() => { setClick(!Click) }}
            />

          </div>
          <div className='
          xsm:w-full
          md:w-auto'>
            <Input />
          </div>

          <div className='xsm:hidden xxsm:hidden 
          md:flex'>
            <ul className='flex items-center gap-4 text-nowrap'>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to={currentUser?"/profile":"/signIn"}>
                {currentUser ? (<img className='rounded-full object-cover w-7 h-7 cursor-pointer' src={currentUser.avatar} alt="profile-pic" />)
                  : "Sign In"
                }
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {Click &&
          <div className='md:hidden flex justify-center bg-[#E2E8F0]'>
            <ul className=' flex flex-col gap-4 pb-6'>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </div>
        }
      </>
    </>
  )
}
