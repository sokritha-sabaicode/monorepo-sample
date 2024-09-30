"use client";
import React, { useEffect, useState } from "react";
import CardRating from "./rating-card";
import Link from "next/link";
import axios from "axios";

interface typePropsTotal{
    propTotal:(value:number) => void;
}
const PuzzleCard: React.FC <typePropsTotal> = ({propTotal}) => {

    const [info, setInfo] = useState<number>(0);
    const [edu, setEud] = useState<number>(0);
    const [exp, setExp] = useState<number>(0);
    const [self, setSelf] = useState<number>(0);
    const [skill, setSkill] = useState<number>(0);
    const [cert, setCert] = useState<number>(0);
    const [port, setPort] = useState<number>(0);
    const [ref, setRef] = useState<number>(0);

    useEffect(()=>{
        async function GetCard(){
            // const ip = 'http://localhost:3040' 
            // const ip = 'http://192.168.3.167:3030' 
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true, // Make sure cookies are handled properly
              };
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/pfComplete/`,config);
                if(!response){
                    return null
                }
                setInfo(Number(response.data.basic) || 0);
                setEud(Number(response.data.education) || 0);
                setExp(Number(response.data.experience) || 0);
                setRef(Number(response.data.reference) || 0);
                
            }catch(error){
                console.error(error);
            }
        }
        GetCard();
    },[])
    useEffect(() => {
        const totalRating=info + edu + exp + self + skill + cert + port + ref
        const totalRatingNew = Math.round((totalRating * 100) / 800);
        propTotal(totalRatingNew)
    }, [info, edu, exp, self, skill, cert, port, ref,propTotal])

    const TitleCard = [
        { txt: "Basic Information", rating: info, route: "/basic" },
        { txt: "Eucaturation", rating: edu, route: "/educ" },
        { txt: "Exprience ", rating: exp, route: "/exp" },
        { txt: "Self Desception", rating: self, route: "/self" },
        { txt: "Skills", rating: skill, route: "/skills" },
        { txt: "Certificates", rating: cert, route: "/certificates" },
        { txt: "Portfilio", rating: port, route: "/portfilio" },
        { txt: "References", rating: ref, route: "/refenrences" },
    ];
    return (
        <div className="flex container justify-center w-full gap-[4%] h-full pt-5 flex-wrap  ">
            {TitleCard.map((item,index) => (
                <div key={index} className=" h-24 w-[46%] shadow-md rounded-md ">
                    <Link href={`${item.txt}/${item.route}`}>
                        <CardRating rating={item.rating} txt={item.txt} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default PuzzleCard;
