import { useSignals } from "@preact/signals-react/runtime"
import { useNavigate } from "react-router-dom"

const AddMenu = ({ state }) => {
    useSignals()
    const navigate = useNavigate()
    const inputs = state.todos.inputs
    const addTodo = () => {

        if (!inputs.titleInput.value || inputs.titleInput.value > 100) {
            return
        }

        state.todos.add({
            title: inputs.titleInput.value,
            description: inputs.descInput.value,
            is_done: inputs.isDoneInput.value,
            in_backlog: inputs.inBacklogInput.value,
        }, true);
        
        inputs.titleInput.value = "";
        inputs.descInput.value = "";
        inputs.isDoneInput.value = false;
        inputs.inBacklogInput.value = true;
    };
    return (<div className="inputs">
        <input
        className="input-field"
        placeholder="Task Title"
        value={inputs.titleInput}
        onChange={(el) => inputs.titleInput.value = el.target.value}
        maxLength={100}
        />
        {/* <input
        className="input-field"
        placeholder="Task Description"
        value={inputs.descInput}
        onChange={(el) => inputs.descInput.value = el.target.value}
        /> */}
        <div className="add-button" onClick={addTodo}>Add Task</div>
        <div className="add-button" onClick={() => {
            state.user.logout()
            state.render()
        }}>Log out</div>
    </div>)
}

export default AddMenu