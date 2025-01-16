import { Group } from "@/types/types";
import { supabase } from "./supabaseClient";

export default async function getGroups() {
    const {data, error} = await supabase
        .from('groups')
        .select('*')
        .order('created_at', {ascending: false});

    if (error) {
        console.log(error)
    }

    return (data as Group[]) || [];
}

