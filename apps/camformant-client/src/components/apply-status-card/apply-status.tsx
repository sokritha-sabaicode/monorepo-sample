'use client'

import React, { useEffect, useState } from 'react'
import NoApply from './no-apply'

import CardStatus from './card-status'




const ApplyStatus:React.FC = () => {
    const [apply, setApply] = useState<number>(1);
    const [shortList, setShortList] = useState<number>(0);
    const [interview, setInterview] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(true);
    return (
        <div className=" ipse:text-sm ipx:text-base container pt-12 h-screen flex flex-col justify-start gap-5 ">

            <div className=" flex gap-10 bg-white p-4 drop-shadow-md rounded-xl items-center justify-center">
                <div className="flex flex-col gap-1 items-center justify-center ">
                    <span>{apply}</span>
                    <span>Job Applied</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center ">
                    <span>{interview}</span>
                    <span>Interview</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center ">
                    <span>{shortList}</span>
                    <span>Short List</span>
                </div>

            </div>
            {apply === 0 ? <NoApply /> : <div ><CardStatus setTotal={setApply} total={apply}  /></div> }
           
        </div>
    )
}

export default ApplyStatus
