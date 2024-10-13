import './WeekTable.css';
import { useSignals } from "@preact/signals-react/runtime";
import { getCurrentWeek } from '../../utils/getCurrentWeek'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WeekColumn from './Column/Column';
import AddMenu from './AddMenu/AddMenu';
import Notification from '../Notification/Notification';

function WeekTable({ state }) {
    useSignals();

    const todos = state.todos.all;

    const daysOfWeek = getCurrentWeek()
    

    return (
    <DndProvider backend={HTML5Backend}>
        <Notification message={"Это тестовая версия!"}></Notification>
        <div className="console-loft">
            <div className="leftside">
                <div className="header">
                    <h1>Task Manager</h1>
                </div>
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

export default WeekTable;
