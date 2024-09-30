import React from 'react'

interface inputdate{
    date: string;
    focusedField?: string;
    setOpen: (value: boolean) => void;
    
}
const InputDateField:React.FC<inputdate> = ({setOpen,date,focusedField}) => {
  return (
    <div className="w-full container relative pt-10">
    <h1 onClick={()=>setOpen(true)} className={`w-full outline-none rounded-2xl ${date ? "p-5" : 'p-8'} shadow-md shadow-black-300 pl-7`}>{date}</h1>
    <label
      className={`transition-all text-gray-400 absolute ${date || focusedField === 'date' ? "top-7" : "top-16"} left-10`}
    >
      Date of Birth
    </label>
    <span></span>
  </div>

  )
}

export default InputDateField
