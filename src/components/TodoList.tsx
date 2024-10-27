// Dependencies
import { TodoType } from "../types/todo"

// Components
import Todo from "./Todo"

interface TodoListProps {
    todos: TodoType[],
    onCompleteTodo: (id: string) => void,
    onEditTodo: (id: string, title: string) => void,
    onDeleteTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onCompleteTodo, onEditTodo, onDeleteTodo }) => {
    return (
        <section>
            {
                todos.map(todo => (
                    <Todo
                        key={ todo.id }
                        id={ todo.id }
                        title={ todo.title }
                        completed={ todo.completed }
                        onCompleteTodo={ onCompleteTodo }
                        onEditTodo={ onEditTodo }
                        onDeleteTodo={ onDeleteTodo }
                    />
                ))
            }
        </section>
    )
}

export default TodoList