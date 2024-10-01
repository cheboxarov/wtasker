import { useDrag } from "react-dnd";
import { useState } from "react";
import styles from './Task.module.css';

const Task = ({ state, todo }) => {
    const [, drag] = useDrag({
        type: "task",
        item: { ...todo },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [isDone, setIsDone] = useState(todo.is_done);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        todo.title = title; // Сохраняем отредактированное название
        state.todos.update(todo);
    };

    const handleDone = () => {
        setIsDone(!isDone);
        todo.is_done = !isDone;
        state.todos.update(todo);
    };

    return (
        <div ref={isEditing ? null : drag} className={`${styles.task} ${isDone ? styles.done : ""}`}>
            <div className={styles.taskContent}>
                    {isEditing ? (<><span 
                        role="textbox"
                        className={styles.textarea}
                        contentEditable={true}
                        onBlur={e => { setTitle(e.target.innerText) }}
                    >{title}</span></>) 
                    : 
                    (<div className={styles.titleContainer}>
                        <span className={styles.title} onClick={handleEdit}>{title}</span>
                    </div>)}
                    <div className={styles.actions}>
                        <input 
                            type="checkbox" 
                            checked={isDone} 
                            onChange={handleDone}
                            className={styles.checkbox}
                        />
                        <button onClick={() => state.todos.delete(todo)} className={styles.deleteBtn}>🗑️</button>
                        {isEditing && (
                            <button onClick={handleSave} className={styles.saveBtn}>Сохранить</button>
                        )}
                    </div>
                </div>
        </div>
    );
};

export default Task;
