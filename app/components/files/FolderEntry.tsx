import Image from 'next/image';
import folder from '@/public/folder.png'

interface FolderProps {
    name: string;
}

const Folder: React.FC<FolderProps> = ({name}) => {
    return (
        <div className="flex items-center gap-4 hover:bg-slate-100">
            <Image src={folder} alt="folder" className="w-[20px] h-[20px]" />
            <span>{name}</span>
        </div>
    )
}

export default Folder;