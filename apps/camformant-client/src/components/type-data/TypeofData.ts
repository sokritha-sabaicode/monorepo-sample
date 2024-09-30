import { ReactNode } from "react"

interface Data2 {
    id?: number
    txt?: string
    logo?: string
    position?: number
    time?: JobTime
    salary?: Salary
    date?: string
    location?: string
    like?: boolean
    day?:number,
    handleHeartClick?:(id:number)=>void
    styles?:string
    handleClick?:()=>void
    process?:TypeProcess[]
}

interface JobTime {
    part: string
    full: string
}

interface Salary {
    min: number
    max: number
}

export interface TypeProcess {
    id?:string;
    date?: string;
    month?: string;
    status?: boolean;
    text?:string;
    icon?: ReactNode
}

export default Data2