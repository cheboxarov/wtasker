import { useDrag, DragPreviewImage } from "react-dnd";
import { useState } from "react";
import styles from './Task.module.css';

const Task = ({ state, todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [isDone, setIsDone] = useState(todo.is_done);
    
    const [{ isDragging }, drag, preview] = useDrag({
        type: "task",
        item: { ...todo },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            // className={`${styles.task} ${isDone ? styles.done : ""} ${isDragging ? styles.dragging : ""}`}
            className={`${styles.task} ${isDone ? styles.done : ""}`}
        >
            <DragPreviewImage connect={preview} src="" />

            <div className={styles.taskContent}>
                <div className={styles.actions}>
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => {
                            setIsDone(!isDone);
                            todo.is_done = !isDone;
                            state.todos.update(todo);
                        }}
                        className={styles.checkbox}
                    />
                    <button onClick={() => state.todos.delete(todo)} className={styles.deleteBtn}>🗑️</button>
                    {isEditing && (
                        <div onClick={() => {
                            setIsEditing(false);
                            todo.title = title;
                            state.todos.update(todo);
                        }} className={styles.saveBtn}>Save</div>
                    )}
                </div>
                {isEditing ? (
                    <span
                        role="textbox"
                        className={styles.textarea}
                        contentEditable={true}
                        onBlur={e => { setTitle(e.target.innerText) }}
                    >{title}</span>
                ) : (
                    <div className={styles.titleContainer}>
                        <span className={styles.title} onClick={() => setIsEditing(true)}>{title}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Task;
