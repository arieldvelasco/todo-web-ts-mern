// Dependencies
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { loadData, saveData } from "./utils/local-storage"
import { ToastContainer, toast } from 'react-toastify';

// Types
import { TodoType } from "./types/todo"

// Components
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

// Styles
import './App.css'

const App = (): JSX.Element => {

    const [ todos, setTodos ] = useState<TodoType[]>(loadData('todos'))

    useEffect(() => {
        saveData('todos', todos)
    }, [todos])

    const handleAddTodo = (title: string) => {
        const newTodo: TodoType = {
            id: uuid(),
            title,
            completed: false
        }
        setTodos([...todos, newTodo])
        toast.success("Todo added!");
    }

    const handleCompleteTodo = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                if (!todo.completed) {
                    toast.success("Todo marked as completed!");
                } else {
                    toast.success("Todo marked as uncompleted!");
                }
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        })
        setTodos(newTodos)
    }

    const handleEditTodo = (id: string, title: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title
                }
            }
            return todo
        })
        setTodos(newTodos)
        toast.success("Todo edited!");
    }

    const handleDeleteTodo = (id: string) => {
        const newTodos = todos.filter( todo => todo.id !== id  )
        setTodos(newTodos)
        toast.success("Todo deleted!");
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
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
        
    )
}

export default App