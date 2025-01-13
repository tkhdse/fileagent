import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/libs/supabaseClient";

export async function POST(req: NextRequest) {
    const {email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    

    try {

        const { data: { user, session }, error: auth_error } = await supabase.auth.signUp({email, password});

        const user_id = user?.id;

        const {data: user_data, error: user_error} = await supabase
            .from('users')
            .insert({id: user_id})
            .select();

        // console.log(user_data)
        // console.log(user_error)
        

    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }


    return NextResponse.json({ message: "User created successfully" }, {status: 201});
}