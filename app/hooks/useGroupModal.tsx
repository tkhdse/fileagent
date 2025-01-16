import { create } from 'zustand'

interface GroupModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useGroupModal = create<GroupModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useGroupModal;