'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as Form from '@radix-ui/react-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Login() {

    const supabase = createClientComponentClient();
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    // const { session } = useSessionContext();
    // const [session, setSession] = useState<Session | null>(null);
    const redirectPath = searchParams.get('redirect') || "/dashboard"

    const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email')?.toString() ?? "";
        const password = formData.get('password')?.toString() ?? "";


        try {
            const { error } = await supabase.auth.signInWithPassword({email, password});
            if (error) {
                console.log(error.message);
                return;
            }

        } catch (error) {
            console.log(error);
            setError("There was an issue logging into your account");
            return;
        } 
    }

    useEffect(() => {
        const { data : { subscription } } = supabase.auth.onAuthStateChange((event, updatedSession) => {      
            if (updatedSession) {
              router.refresh();
              router.push(redirectPath);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase, router, redirectPath])

    return (
        <>
            <div className="absolute w-[30%] ml-[35%] flex justify-center mt-[150px] bg-slate-200 rounded-md p-2 shadow-gray-500 shadow-md">

                <div className="flex flex-col items-center w-[90%]">
                    <span className="text-xl mb-[10px]"> Log in </span>

                    <Form.Root className="w-[100%] flex flex-col items-center" onSubmit={handleLogIn}>
                        <Form.Field name="email" className="w-[100%] flex flex-col mb-[20px]">
                            <div className="flex justify-between">
                                <Form.Label className="text-sm font-medium">Email</Form.Label>
                            </div>
                            <Form.Control asChild>
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="password" className="w-[100%] flex flex-col mb-[20px]">
                            <div className="flex justify-between">
                                <Form.Label className="text-sm font-medium">Password</Form.Label>
                            </div>
                            <Form.Control asChild>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            </Form.Control>
                        </Form.Field>

                        <span className='text-red-500 mb-[10px]'>{error}</span>

                        <Form.Submit asChild className="mb-[5px]">
                            <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                            Submit
                            </button>
                        </Form.Submit>
                    </Form.Root>
                </div>

            </div> 
        </>
    )
}