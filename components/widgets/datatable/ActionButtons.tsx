
import { MdDelete, MdEdit } from "react-icons/md";

export const EditButton = ({onClick}:{onClick: () => void}) => {
    return (
       <button className='actionbtn bg-blue-600 hover:bg-blue-800'><MdEdit/></button>
    
    );
}

export const DeleteButton = ({onClick}:{onClick: () => void}) => {
    return (
<button className='actionbtn bg-red-600 hover:bg-red-800'><MdDelete/></button>
    );
}

