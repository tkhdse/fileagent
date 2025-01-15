'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Group } from '@/types/types'
import { supabase } from "@/libs/supabaseClient";
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
      <div className="flex-col w-[95%] ml-[2.5%] mt-[25px]">
        <span className="text-black text-2xl">{group?.name}</span>
        <div className="w-full flex mt-5">
          <div className="w-[20%]  m-2">
            <span className="p-2">
              Files/Documents
            </span>
            <div className="p-4">
              <FileSystem />
            </div>
          </div>

          <div className="w-[80%] m-2">
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
