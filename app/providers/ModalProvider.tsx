'use client'

// import Modal from "./Modal";
import { useState, useEffect } from "react";
import GroupModal from "@/app/components/modal/GroupModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);


    // ensured modals cannot be opened during SSR
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    return (
        <div>
            <GroupModal />
        </div>
    )
}

export default ModalProvider;