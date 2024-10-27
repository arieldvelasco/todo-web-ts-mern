// Styles
import './Checkbox.css'

interface CheckboxProps {
    id: string,
    checked: boolean,
    onCompleteTodo: (id: string) => void,
}

const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onCompleteTodo }) => {
    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                className="checkbox-knob"
                checked={ checked }
                onChange={ () => onCompleteTodo(id) }
            />
        </div>
    )
}

export default Checkbox