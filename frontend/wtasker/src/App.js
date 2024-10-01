import './App.css';
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from '@preact/signals-react';
import { getCurrentWeek } from './utils/getCurrentWeek'
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WeekColumn from './components/WeekTable/Column/Column';
import AddMenu from './components/WeekTable/AddMenu/AddMenu';

function App({ state }) {
    useSignals();

    const todos = state.todos.all;
    const inputs = state.todos.inputs

    const daysOfWeek = getCurrentWeek()
    
    return (
    <DndProvider backend={HTML5Backend}>
    <div className="console-loft">
        <div className="leftside">
            <div className="header">
                <h1>Popka Manager</h1>
            </div>

            {/* Добавление задачи */}
            <AddMenu state={state}></AddMenu>
            <div className='week-container'>
                <WeekColumn state={state} day={null} todos={todos.value}/>
            </div>
        </div>
        <div className="week-container">
            {daysOfWeek.map((day) => (
            <WeekColumn state={state} key={day} day={day} todos={todos.value}/>
            ))}


        </div>
        </div>
    </DndProvider>
    );
}

export default App;
