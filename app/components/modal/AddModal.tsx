'use client' 

import Image from "next/image"
import icon from '@/public/plus.png'
import useGroupModal from "@/app/hooks/useGroupModal";


const AddModal = () => {
    const modal = useGroupModal();
    return (
        <Image src={icon} alt="add" className="w-[20px] h-[20px] cursor-pointer" onClick={modal.onOpen}/>
    )
}


export default AddModal;
