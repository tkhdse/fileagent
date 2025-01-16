import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/libs/supabaseClient";
// import { supabase } from "@/app/libs/supabaseClient";

export async function POST(req: NextRequest) {
    const { user } = await req.json();


    if (!user) {
        return NextResponse.json({ error: 'User not created' }, { status: 400 });
    }
    

    try {

        const user_id = user?.id;
        const {error} = await supabase
            .from('users')
            .insert({id: user_id})
            .select()
            .limit(1).single()
        
        console.log(error?.message)

    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }


    return NextResponse.json({ message: "User created successfully" }, {status: 201});
}