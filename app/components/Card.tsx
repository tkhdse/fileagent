interface CardProps {
    name: string,
    description: string,
    num_collab: number,
}

const Card: React.FC<CardProps> = ({name, description, num_collab}) => {
    return (
        <div className="h-[250px] bg-slate-200 rounded-md cursor-pointer">
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
