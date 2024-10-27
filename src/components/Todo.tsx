// Dependencies
import { useState } from "react"
import { toast } from 'react-toastify';

// Icons
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { FaRegSquareCheck } from "react-icons/fa6";

// Elements
import Checkbox from "../elements/Checkbox/Checkbox";

interface TodoProps {
    id:string,
    title: string,
    completed: boolean,
    onCompleteTodo: (id: string) => void,
    onEditTodo: (id: string, title: string) => void,
    onDeleteTodo: (id: string) => void
}

const Todo: React.FC<TodoProps> = ({ id, title, completed, onCompleteTodo, onEditTodo, onDeleteTodo }) => {

    const [ editState, setEditState ] = useState<boolean>(false)
    const [ newTitle, setNewTitle ] = useState<string>(title)
    
    return (
        <div  >
            {
                editState ? (
                    <div className="todo-item" >
                        <input
                            className="todo-item-text"
                            type="text"
                            value={ newTitle }
                            onChange={ (e) => setNewTitle(e.target.value) }
                            onKeyDown={ (e) => { if (e.key === 'Enter') {
                                onEditTodo(id, newTitle)
                                setEditState(false)
                            }}}
                        />
                        <button
                            className="btn btn-danger"
                            onClick={
                                () => {
                                    setEditState(false)
                                    toast.error("Edit canceled!")
                                }
                            }
                        >
                                <TiCancel />
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={ () => {
                                onEditTodo(id, newTitle)
                                setEditState(false)
                            }}
                        >
                            <FaRegSquareCheck />
                        </button>
                    </div>
                ) : (
                    <div className="todo-item" >
                        <Checkbox 
                            id={ id }
                            checked={ completed }
                            onCompleteTodo={ onCompleteTodo }
                        />
                        <span className={` ${completed ? 'completed' : ''} todo-item-text`} >
                            {title}
                        </span>
                        <button
                            className="btn btn-warning"
                            onClick={ () => setEditState(true) }
                        >
                            <FaEdit />
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={ () => onDeleteTodo(id) }
                        >
                            <MdDeleteForever />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Todo