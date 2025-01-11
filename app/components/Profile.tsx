import Image, { StaticImageData } from "next/image";

interface ProfileProps {
    image: StaticImageData,
}


const Profile: React.FC<ProfileProps> = ({image}) => {
    return (
        <div className="flex bg-gray-200 hover:bg-gray-300 border-black border-[1px] rounded-full h-[45px] w-[45px] items-center justify-center">
            <Image src={image} alt="profile" className="w-[60%] h-[60%] cursor-pointer "/>
        </div>
    )
}

export default Profile;