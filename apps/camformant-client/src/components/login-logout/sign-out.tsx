import React from 'react'
import { RxExit } from "react-icons/rx";

interface LogoutProps {
  isLogout: string | null
  onHandleLogout: React.MouseEventHandler<HTMLSpanElement>
}


const ButtonSignOut: React.FC<LogoutProps> = ({ isLogout, onHandleLogout }) => {

  return (
    <div className=' p-4 w-full flex items-center justify-start bg-white drop-shadow-md rounded-3xl '>
      <span onClick={onHandleLogout} className='flex text-primary items-center gap-5 text-lg'>
        <RxExit className='text-2xl' />{isLogout ? "Sign Out" : "Register Account"}</span>
    </div>
  )
}

export default ButtonSignOut
