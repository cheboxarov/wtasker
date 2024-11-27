import { DndProvider, useDrag, useDrop } from "react-dnd";
import Task from "../Task/Task";
import { useSignals } from "@preact/signals-react/runtime";
import { useState } from "react";
import styles from './Column.module.css'

const WeekColumn = ({ state, day, todos }) => {

    const [isDoneShowing, setIsDoneShowing] = useState(true)

    useSignals()
    const toDay = new Date();
    const toDayString = toDay.toISOString().split('T')[0]
    const currentDay = toDayString == day ? toDayString + "\n(сегодня)" : null

    const moveTask = (item, newDate) => {
        if (item.due_date === newDate)
            return
        const newTodo = item;
        newTodo.due_date = newDate;
        newTodo.in_backlog = false;
        state.todos.update(newTodo)
    };

    const [, drop] = useDrop({
      accept: "task",
      drop: (item) => moveTask(item, day),
    });
    let todosInColumn = todos.filter(todo => todo.due_date === day).sort((a, b) => a.is_done - b.is_done)
    if (!isDoneShowing) {
        todosInColumn = todosInColumn.filter(todo => !todo.is_done)
    }

    return (
      <div ref={drop} className="week-column">
        <h3>{currentDay || day || "New Tasks"}</h3>
        <div className="week-column-tasks">
            {todosInColumn.map((todo) => (
                <Task state={state} key={todo.id} todo={todo} />
            ))}
        </div>
        { todosInColumn.filter(todo => todo.is_done).length > 0 && (isDoneShowing ? (
            <div onClick={() => { setIsDoneShowing(false) }} className={styles.hideShowTasksButton}>hide done tasks</div>
        ) : (
            <div onClick={() => { setIsDoneShowing(true) }} className={styles.hideShowTasksButton}>show done tasks</div>
        ))}
      </div>
    );
};

export default WeekColumn