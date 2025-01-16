'use client'

import Modal from "./Modal";
import useGroupModal from "@/app/hooks/useGroupModal";
import * as Form from '@radix-ui/react-form'
import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";


const GroupModal = () => {
    const groupModal = useGroupModal();
    const {user, isLoading} = useUser();
    const router = useRouter();

    const onChange = (open: boolean) => {
        if (!open) {
            groupModal.onClose();
        }
    }

    const createNewGroup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name')?.toString() ?? "";
        const description = formData.get('description')?.toString() ?? "";

        // send request 
        const res = await fetch('/api/group', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                created_by: user?.id
            })
        })

        if (!res.ok) {
            console.log(res)
            throw new Error("Failed to make group");
        }

        router.refresh();
        groupModal.onClose();
    }

    if (isLoading) return <></>

    return (
        <Modal 
            title="Add Group"
            description="Create a new group and upload your files"
            isOpen={groupModal.isOpen}
            onChange={onChange}
        >

            <Form.Root className="flex flex-col items-center mt-[25px] w-[100%]" onSubmit={createNewGroup}>
                <Form.Field name="name" className="w-[100%] flex flex-col mb-[20px]">
                    <div className="flex justify-between">
                        <Form.Label className="">Name</Form.Label>
                        <span className="text-sm text-black">*Required</span>
                    </div>
                    <Form.Control asChild>
                    <input
                        type="text"
                        required
                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </Form.Control>
                </Form.Field>

                <Form.Field name="description" className="w-[100%] flex flex-col mb-[20px]">
                    <div className="flex justify-between">
                        <Form.Label className="">Description</Form.Label>
                        <span className="text-sm text-black">*Required</span>
                    </div>
                    <Form.Control asChild>
                    <textarea
                        required
                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </Form.Control>
                </Form.Field>

                {/* <span className='text-red-500 mb-[10px]'>{error}</span> */}

                <Form.Submit asChild className="">
                    <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                    Create
                    </button>
                </Form.Submit>
            </Form.Root>

        </Modal>
    )
}

export default GroupModal;