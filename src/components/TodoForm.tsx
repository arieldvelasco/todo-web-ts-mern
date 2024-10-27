// Dependencies
import React, { useState } from 'react'

interface TodoFormProps {
    onAddTodo: (title: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {

    const [ newTitle, setNewTitle ] = useState<string>('')

    const handleAddTodo = () => {
        if (newTitle.trim() === '') {
            alert('New todo title is required')
            return
        }
        onAddTodo(newTitle)
        setNewTitle('')
    }

    return (
        <div className='todo-input' >
            <span className='todo-input-label' >Todo:</span>
            <input
                className='todo-input-text'
                type="text"
                value={ newTitle }
                placeholder="Add new todo"
                onChange={ (e) => setNewTitle(e.target.value) }
                onKeyDown={ (e) => { if (e.key === 'Enter') {
                    handleAddTodo()
                }}}
            />
            <div
                className='btn todo-input-btn'
                onClick={ (e) => {
                    e.preventDefault()
                    handleAddTodo()
                }}
            >
                ADD
            </div>
        </div>
    )
}

export default TodoForm