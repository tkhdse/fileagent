'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/libs/supabaseClient'
import * as Form from '@radix-ui/react-form'

export default function Login() {

    const [error, setError] = useState("");
    const router = useRouter();

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

        const { error } = await supabase.auth.signUp({email, password});
        if (error) {
            setError(error.message);
        } else {
            alert("Confirm email (check your inbox)");
        }
    }


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