import './App.css';
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from '@preact/signals-react';

const isDoneInput = signal(false);
const inBacklogInput = signal(true);
const titleInput = signal("");
const descInput = signal("");

const filterTitleInput = signal("");  // Фильтр по названию
const filterIsDone = signal(false);   // Фильтр по статусу выполнения
const filterInBacklog = signal(false);  // Фильтр по наличию в бэклоге

function App({ state }) {
    useSignals();

    const todos = state.todos.all;

    const addTodo = () => {
        state.todos.add({
            title: titleInput.value,
            description: descInput.value,
            is_done: isDoneInput.value,
            in_backlog: inBacklogInput.value,
        }, true);
        
        titleInput.value = "";
        descInput.value = "";
        isDoneInput.value = false;
        inBacklogInput.value = true;
    };

    const filteredTodos = todos.value.filter(todo => {
        return (
            todo.title.toLowerCase().includes(filterTitleInput.value.toLowerCase()) &&
            (!filterIsDone.value || todo.is_done) &&
            (!filterInBacklog.value || todo.in_backlog)
        );
    });

    return (
        <div className="console-loft">
            <div className="header">
                <h1>Task Manager</h1>
                <span className="count-display">Total tasks: {state.todos.allCount}</span>
            </div>

            {/* Фильтры */}
            <div className="filters">
                <input
                    className="input-field"
                    placeholder="Filter by Title"
                    value={filterTitleInput}
                    onChange={(el) => filterTitleInput.value = el.target.value}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={filterIsDone.value}
                        onChange={() => filterIsDone.value = !filterIsDone.value}
                    /> Show Only Done
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filterInBacklog.value}
                        onChange={() => filterInBacklog.value = !filterInBacklog.value}
                    /> Show Only In Backlog
                </label>
            </div>

            {/* Список задач с фильтрацией */}
            <div className="tasks-container">
                {filteredTodos.map(todo => (
                    <div className="todo-item" key={todo.id}>
                        <span className="todo-title">Title: {todo.title}</span>
                        <span className="todo-desc">Description: {todo.description}</span>
                        <span className="todo-status">Status: {todo.is_done ? "Done" : "Pending"}</span>
                        <span className="todo-backlog">In Backlog: {todo.in_backlog ? "Yes" : "No"}</span>
                    </div>
                ))}
            </div>

            <div className="inputs">
                <input
                    className="input-field"
                    placeholder="Task Title"
                    value={titleInput}
                    onChange={(el) => titleInput.value = el.target.value}
                    maxLength={100}
                />
                <input
                    className="input-field"
                    placeholder="Task Description"
                    value={descInput}
                    onChange={(el) => descInput.value = el.target.value}
                />
                <div className="checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            checked={isDoneInput.value}
                            onChange={() => isDoneInput.value = !isDoneInput.value}
                        /> Done
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={inBacklogInput.value}
                            onChange={() => inBacklogInput.value = !inBacklogInput.value}
                        /> In Backlog
                    </label>
                </div>
                <button className="add-button" onClick={addTodo}>Add Task</button>
            </div>

            {state.todos.serverError.value && (<div className="error-message">{state.todos.serverError}</div>)}
        </div>
    );
}

export default App;
