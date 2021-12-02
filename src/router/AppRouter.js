import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Redirect
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>


                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/" element={<CalendarScreen />} />
                    <Route path="*"  element={<CalendarScreen />} />
                </Routes>
            </div>
        </Router>
    )
}
