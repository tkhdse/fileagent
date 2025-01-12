"use client"

import Card from "../components/Card";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { supabase } from "@/libs/supabaseClient";
import icon from '@/public/plus.png'
import useGroupModal from "@/hooks/useGroupModal";


export default function Dashboard({user} : {user : any}) {

  // user

  const networks = ["TG", "MP", "joe mama", "UIUC", "JHVRD"];
  
  const modal = useGroupModal();

  // database query from network_members to retrieve list of networks + descriptions

  return (
    <>
      {/* <Navbar profile={img}/> */}
      <div className="flex-col w-[85%] ml-[7.5%] mt-[150px]">
        <div className="flex justify-between items-center">
          <span className="text-black text-2xl">Your Networks</span>
          <Image src={icon} alt="add" className="w-[20px] h-[20px] cursor-pointer" onClick={modal.onOpen}/>
        </div>
        <div className="w-full grid grid-cols-4 gap-4 mt-5">
            {
              networks.map((entry, i) =>
                 <Card key={i} name={entry} description={"temp description " + i} num_collab={0}></Card>
              )
            }


        </div>
      </div>  
    </>
  );
}