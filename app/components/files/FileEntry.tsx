import Image from 'next/image';
import file from '@/public/file.svg'

interface FileProps {
    name: string;
}

const File: React.FC<FileProps> = ({name}) => {
    return (
        <div className="flex items-center gap-4 hover:bg-slate-100">
            <Image src={file} alt="file" className="w-[20px] h-[20px]"/>
            <span>{name}</span>
        </div>
    )
}


export default File;