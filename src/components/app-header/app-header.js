import React from 'react';
import './app-header.css';
import { withRouter } from 'react-router-dom';

const AppHeader = (props) => {

    const onLogOut = () => {
        props.logOut();
        return props.history.push('/login');
    }

    const logOutButton = props.isLoggedIn()
    ? <button type="button" className="logout-button" onClick={onLogOut}>Logout</button>
    : null;

    return(
        <header className="app-header">
            <span className="logo">Emphasoft Test Assignment</span>
            {logOutButton}
        </header>
    );
}

export default withRouter(AppHeader);