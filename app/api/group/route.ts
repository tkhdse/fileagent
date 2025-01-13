import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/libs/supabaseClient";

export async function POST(req: NextRequest) {
    const {name, description, created_by} = await req.json();

    if (!name || !created_by) {
        return NextResponse.json({ error: 'name and user_id are required' }, { status: 400 });
    }
    

    try {
        const {data: group_data, error: group_error} = await supabase
            .from('groups')
            .insert({name: name, description: description.trim(), created_by: created_by})
            .select();

        if (!group_data || group_error) {
            throw new Error("Something went wrong with inserting group")
        }

        const group_id = group_data[0].id;
        
        const {data: member_data, error: member_error} = await supabase
        .from('group_members')
        .insert({user_id: created_by, group_id: group_id})
        .select()
        
        // console.log(member_data)
        // console.log(member_error)
        

    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }


    return NextResponse.json({ message: "Group created successfully" }, {status: 201});
}