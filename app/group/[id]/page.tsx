'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Group } from '@/types/types'
import { supabase } from "@/app/libs/supabaseClient";
import PromptInput from "@/app/components/PromptInput";
import FileSystem from "@/app/components/files/FileSystem";

export default function GroupPage() {
  const params = useParams();
  const id = params.id;

  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchGroup = async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setGroup(data);
      } else {
        console.error(error);
      }
    };

    fetchGroup();
  }, [id]);

  return (
    <>
      {/* <Navbar profile={img}/> */}
      <div className="flex flex-col w-[95%] ml-[2.5%] mt-[25px]">
        <div className="flex flex-col ">
          <span className="text-2xl text-black">{group?.name}</span>
          <span className="text-sm mt-2 ml-10 text-slate-600">{group?.description}</span>
        </div>

        <div className="w-full flex mt-5">
          <div className="w-[30%]  m-2">
            <span className="p-2">
              Files/Documents
            </span>
            <div className="p-4">
              <FileSystem />
            </div>
          </div>

          <div className="w-[70%] m-2">
            <span className="p-2">
              Language Model
            </span>
            <div className="p-4">
              <PromptInput />
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}
