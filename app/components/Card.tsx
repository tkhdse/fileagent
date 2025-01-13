"use client"

import { useRouter } from "next/navigation"

interface CardProps {
    id: string,
    name: string,
    description: string,
    num_collab: number,
}

const Card: React.FC<CardProps> = ({id, name, description, num_collab}) => {
    const router = useRouter();

    return (
        <div className="h-[250px] bg-slate-200 border border-black rounded-md cursor-pointer" onClick={() => {router.push(`/group/${id}`)}}>
            <div className="flex flex-col h-[100%] justify-between gap-4 ml-4">
                <div className="flex flex-col gap-4 ">
                    <span className="text-2xl">{name}</span>
                    <span className="ml-2 text-sm text-gray-400">{description}</span>
                </div>


                <div className="">
                    <span className="text-sm text-gray-600">Collaborators: {num_collab}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;
