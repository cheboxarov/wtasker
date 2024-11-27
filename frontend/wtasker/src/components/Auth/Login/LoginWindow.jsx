import React from 'react';
import styles from './LoginWindow.module.css'; // Модульные стили
import { useSignals } from '@preact/signals-react/runtime';
import { signal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom'; // Добавляем useNavigate
import Notification from '../../Notification/Notification';

const login = signal("")
const password = signal("")

const LoginWindow = ({ state }) => {
    useSignals()

    const navigate = useNavigate()

    const loginHandler = () => {
        if (state.user.me.authProcess.value)
            return
        state.user.login(login.value, password.value, () => {
            state.render()
        })
        navigate("/")
    }

    const registerHandler = () => {
        navigate("/register")
    }

    return (
        <div className={styles.wrapper}>
            <Notification message={"login: admin\n password: admin"} />
            <div className={styles.loginContainer}>
                <h2 className={styles.title}>Hello World!</h2>
                <div className={styles.inputs}>
                    <input value={login.value} onChange={e => login.value = e.target.value} type="text" placeholder="Username" className={styles.inputField}/>
                    <input value={password.value} onChange={e => password.value = e.target.value} type="password" placeholder="Password" className={styles.inputField}/>
                </div>
                <div onClick={loginHandler} className={state.user.me.authError != "" ? styles.loginButtonError : styles.loginButton}>{state.user.me.authError != "" ? state.user.me.authError : "Login"}</div>
                <br />
                <div>Нет аккаунта?<span onClick={registerHandler} className={styles.registerButton}>Зарегистрироваться</span></div>
            </div>
        </div>
    );
};

export default LoginWindow;
