import React from 'react';
import './error-message.css';

const ErrorMessage = (props) => {
    return (
        <div className="error-message">
            {props.message}
        </div>
    );
}

export default ErrorMessage;