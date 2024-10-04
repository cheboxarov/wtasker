import './App.css';
import WeekTable from './components/WeekTable/WeekTable';
import LoginWindow from './components/Auth/Login/LoginWindow';
import RegistrationWindow from './components/Auth/Registration/RegistrationWindow';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

function App({ state }) {
    console.log(state.user.me.authentificated)

    if (!state.user.me.authentificated)
        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginWindow state={state} />} />
                    <Route path="/register" element={<RegistrationWindow state={state} />} />
                    <Route path='*' element={<Navigate to={"/login"} />} />
                </Routes>
            </Router>
            )

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WeekTable state={state} />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
