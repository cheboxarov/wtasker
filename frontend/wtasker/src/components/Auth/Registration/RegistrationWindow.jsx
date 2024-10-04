import React from 'react';
import styles from './RegistrationWindow.module.css'; // Модульные стили
import { useSignals } from '@preact/signals-react/runtime';
import { signal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom'; // Добавляем useNavigate
import Notification from '../../Notification/Notification';

const login = signal("")
const password = signal("")
const password2 = signal("")
const email = signal("")

const RegistrationWindow = ({ state }) => {
    useSignals()

    const navigate = useNavigate()

    const registerHandler = () => {
        const registrationData = {
            username: login.value,
            email: email.value,
            password: password.value,
            password2: password2.value
        }
        state.user.register(registrationData, () => {
            console.log("SUCCESS!")
            navigate("/login")
        })
    }

    return (
        <div className={styles.wrapper}>
            <Notification message={"ПИЗДА"} />
            <div className={styles.loginContainer}>
                <h2 className={styles.title}>ПИЗДА РЕГИСТРИРУЙСЯ</h2>
                <div className={styles.inputs}>
                    <input value={login.value} onChange={e => login.value = e.target.value} type="text" placeholder="Username" className={styles.inputField}/>
                    <input value={email.value} onChange={e => email.value = e.target.value} type="text" placeholder="Email" className={styles.inputField}/>
                    <input value={password.value} onChange={e => password.value = e.target.value} type="password" placeholder="Password" className={styles.inputField}/>
                    <input value={password2.value} onChange={e => password2.value = e.target.value} type="password" placeholder="Retry password" className={styles.inputField}/>
                </div>
                <div onClick={registerHandler} className={state.user.me.registerError != "" ? styles.loginButtonError : styles.loginButton}>{state.user.me.registerError != "" ? state.user.me.registerError : "Register"}</div>
                <div onClick={()=> {navigate("/login")}} className={styles.loginButton}>Login</div>
            </div>
        </div>
    );
};

export default RegistrationWindow;
