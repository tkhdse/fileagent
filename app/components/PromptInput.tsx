'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import icon from '@/public/paper-plane.png'
import * as Form from '@radix-ui/react-form'

const PromptInput = () => {

    const [prompt, setPrompt] = useState<string>("")
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const savedPrompt = localStorage.getItem('prompt_value');
        if (savedPrompt) setPrompt(savedPrompt);
      }, []);


    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            const form = event.currentTarget.closest("form"); 
            if (form) {
              form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); 
            }
          }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedPrompt = event.target.value;
        setPrompt(updatedPrompt)
        localStorage.setItem('prompt_value', updatedPrompt);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const text = formData.get('prompt')?.toString() ?? "";
        if (!text) return;

        
        // POST request to fastAPI server
        try {
            const res = await fetch('http://127.0.0.1:8000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt, max_length: 50}), // change max_length
            })
    
            if (!res.ok){
                throw new Error('failed to generate text')
            }
            
            const data = await res.json()
            setText(data.generated_text);
            console.log(text)

        } catch (err) {
            console.log(err)
            return;
        }


        setPrompt("");
        localStorage.setItem('prompt_value', "");
    }

    return (
        <div className='flex flex-col'>
            <div className="border-[1px] border-black rounded-lg">
                <Form.Root className="flex flex-col" onSubmit={handleSubmit}>
                    <Form.Field name="prompt" className="text-right m-2">
                        <Form.Control asChild>
                            <textarea
                                required
                                // type="text"
                                placeholder='Enter your prompt'
                                value={prompt}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown} 
                                className="w-full p-2 resize-none focus:outline-none border-b-[1px] border-slate-600"
                            />
                        </Form.Control>
                    </Form.Field>


                    <Form.Submit asChild className="w-[100%] flex items-center  mb-2">
                        <button type="submit" 
                            className={`
                                flex 
                                items-center 
                                justify-center 
                                w-[30px] 
                                h-[30px] 
                                ml-auto 
                                mr-2 
                                ${prompt ? "bg-slate-300 " : "bg-slate-200"}
                                rounded-lg`
                            }>
                            <Image src={icon} alt="submit" className="w-[20px] h-[20px] cursor-pointer" />
                        </button>
                    </Form.Submit>
                </Form.Root>
            </div>
            <div className='p-6'>
                {text}
            </div>
        </div>
    )
}


export default PromptInput;