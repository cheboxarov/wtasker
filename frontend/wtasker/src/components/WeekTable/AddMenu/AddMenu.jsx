import { useSignals } from "@preact/signals-react/runtime"

const AddMenu = ({ state }) => {
    useSignals()
    const inputs = state.todos.inputs
    const addTodo = () => {
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
        <button className="add-button" onClick={addTodo}>Add Task</button>
    </div>)
}

export default AddMenu