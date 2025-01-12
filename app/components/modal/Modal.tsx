'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image';
import close_icon from '@/public/close.png'



interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    className="bg-neutral-900/70 fixed inset-0"
                >

                    <Dialog.Content 
                        className="
                        fixed 
                        drop-shadow-md 
                        top-[50%] 
                        left-[50%] 
                        w-[450px] 
                        translate-x-[-50%] 
                        translate-y-[-50%] 
                        rounded-md 
                        bg-slate-200 
                        p-[25px] 
                        focus:outline-none"
                    >
                        <Dialog.Title 
                            className="text-xl text-center font-bold mb-4 text-black"    
                        >
                            {title}
                        </Dialog.Title>
                        <Dialog.Description
                            className="text-center text-black"
                        >
                            {description}
                        </Dialog.Description>
                        <div>
                            {children}
                        </div>
                        <Dialog.Close asChild>
                            <button className="
                                text-neutral-400
                                absolute
                                top-[10px]
                                right-[10px]
                                inline-flex
                                items-center
                                justify-center
                                rounded-full
                                focus:outline-none
                            ">
                                <Image src={close_icon} alt="close" className="w-[10px] h-[10px] cursor-pointer "/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>

                </Dialog.Overlay>
            </Dialog.Portal>

        </Dialog.Root>
    )
}

export default Modal;