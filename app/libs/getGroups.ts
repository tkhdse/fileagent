import { Group } from "@/types/types";
import { supabase } from "./supabaseClient";

export default async function getGroups(id: string) {
    const {data, error} = await supabase
        .from('groups')
        .select('*')
        .eq('created_by', id)
        .order('created_at', {ascending: false});

    if (error) {
        console.log(error)
    }

    return (data as Group[]) || [];
}

