import { DndProvider, useDrag, useDrop } from "react-dnd";
import Task from "../Task/Task";

const WeekColumn = ({ state, day, todos, moveTask }) => {
    
    const toDay = new Date();
    const toDayString = toDay.toISOString().split('T')[0]
    const currentDay = toDayString == day ? toDayString + "\n(сегодня)" : null

    const [, drop] = useDrop({
      accept: "task",
      drop: (item) => moveTask(item, day),
    });

    return (
      <div ref={drop} className="week-column">
        <h3>{currentDay || day || "New Tasks"}</h3>
        <div className="week-column-tasks">
            {todos.filter(todo => todo.due_date === day).map((todo) => (
                <Task state={state} key={todo.id} todo={todo} />
            ))}
        </div>
      </div>
    );
};

export default WeekColumn