import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/libs/supabaseClient";

export async function POST(req: NextRequest) {
    const {email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    try {
        const { error } = await supabase.auth.signInWithPassword({email, password});
        if (error) {
            return NextResponse.json({error: error}, {status: 500});
        }        

    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }

    return NextResponse.json({ message: "User logged in successfully" }, {status: 201});
}