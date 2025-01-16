'use client'

import { useEffect, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Login() {
    const supabase = createClientComponentClient();
    const [error, setError] = useState("");
    // const [waiting, setWaiting] = useState(false);
    const router = useRouter();
    // const router = useRouter();

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email')?.toString() ?? "";
        const password = formData.get('password')?.toString() ?? "";
        const confirm = formData.get('confirmPassword')?.toString() ?? "";

        if (password != confirm) {
            setError("Passwords do not match");
            return;
        }

        try {
            const { data: { user }, error: auth_error } = await supabase.auth.signUp({email, password});

            if (auth_error) {
                console.log(auth_error.message);
                return;
            }

            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({user})
            })

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.data);
            }

        } catch (error) {
            console.log(error);
            setError("There was an issue making your account");
            return;
        }

        alert("Confirm email (check your inbox)");
        // setWaiting(true);        
    }

    useEffect(() => {
        const { data : { subscription } } = supabase.auth.onAuthStateChange((event, updatedSession) => {      
            if (updatedSession) {
              router.refresh();
              router.push('/dashboard');
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase, router])


    return (
        <>
            <div className="absolute w-[30%] ml-[35%] flex justify-center mt-[150px] bg-slate-200 rounded-md p-2 shadow-gray-500 shadow-md">

                <div className="flex flex-col items-center w-[90%]">
                    <span className="text-xl mb-[10px]"> Sign Up </span>

                    <Form.Root className="w-[100%] flex flex-col items-center" onSubmit={handleSignUp}>
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
                                minLength={5}
                                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="confirmPassword" className="w-[100%] flex flex-col mb-[20px]">
                            <div className="flex justify-between">
                                <Form.Label className="text-sm font-medium">Confirm Password</Form.Label>
                            </div>
                            <Form.Control asChild>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                minLength={5}
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