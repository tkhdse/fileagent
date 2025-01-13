import { Group } from "@/types/types";
import { supabase } from "./supabaseClient";

const getGroups = async() => {
    const {data, error} = await supabase
        .from('groups')
        .select('*')
        .order('created_at', {ascending: false});

        if (error) {
            console.log(error)
        }

        return (data as Group[]) || [];
}

export default getGroups