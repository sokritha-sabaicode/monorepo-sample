import React from 'react'
import { RxExit } from "react-icons/rx";

interface LogoutProps{
  logout:string|null
  Logout: React.MouseEventHandler<HTMLSpanElement>
}


const ButtonSigOut:React.FC<LogoutProps> = ({logout,Logout}) => {
  

  return (
    <div className=' p-4 w-full flex items-center justify-start bg-white drop-shadow-md rounded-3xl '>
        <span onClick={Logout} className='flex text-primary items-center gap-5 text-lg'>
          <RxExit className='text-2xl' />{ logout? "Sign Out":"Register Account" }</span>
    </div>
  )
}

export default ButtonSigOut
