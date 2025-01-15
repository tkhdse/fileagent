// update to retrieve all files pertaining to a project
import File from "./FileEntry";
import Folder from "./FolderEntry";

const FileSystem = () => {
    return (
        <div className="border-[1px] border-black  rounded-md p-4">
            <Folder name="root" />
            <File name="index" />
        </div>
    )
};

export default FileSystem;