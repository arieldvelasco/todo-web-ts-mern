// Dependencies
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

// Types
import { TodoType } from "./types/todo"

// Components
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

// Styles
import './App.css'

const App = (): JSX.Element => {

    const [ todos, setTodos ] = useState<TodoType[]>([])

    useEffect(() => {
        getTodos()
    }, [])

    const backendUrl: string = 'http://localhost:3000'

    const getTodos = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/todos`)
            const todoList = await res.json()
            setTodos(todoList)
            console.log('getTodos: ', todoList)
        } catch (error) {
            setTodos([])
            console.error('Error fetching todos', error)
            toast.error('Error fetching todos')
        }
    }

    const handleAddTodo = async (title: string) => {
        const res = await fetch(`${backendUrl}/api/todos`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                completed: false
            })
        })
        const todo = await res.json()
        getTodos()
        console.log(todo);
        toast.success('Todo added!')
    }

    const handleCompleteTodo = async (id: string) => {
        console.log('completing todo: ', id);
        
        const res = await fetch(`${backendUrl}/api/todos/completed/${id}`, {
            method: 'PUT'
        })
        const response = await res.json()
        getTodos()
        console.log(response);
        toast.success('Todo completed status changed!')
    }

    const handleEditTodo = async (id: string, title: string) => {
        console.log('updating todo');
        
        const res = await fetch(`${backendUrl}/api/todos/edit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title
            })
        })
        const todo = await res.json()
        getTodos()
        console.log(todo);
        toast.success('Todo edited!')
    }

    const handleDeleteTodo = async (id: string) => {
        const res = await fetch(`${backendUrl}/api/todos/${id}`, {
            method: 'DELETE'
        })
        const response = await res.json()
        getTodos()
        console.log(response);
        toast.success('Todo deleted!')
    }

    return (
        <div className="container">
            <header>
                <TodoForm onAddTodo={ handleAddTodo } />
            </header>
            <main>
                <TodoList
                    todos={ todos }
                    onCompleteTodo={ handleCompleteTodo }
                    onEditTodo={ handleEditTodo }
                    onDeleteTodo={ handleDeleteTodo }
                />
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                stacked
                theme="light"
            />
        </div>
        
    )
}

export default App