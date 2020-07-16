import React, {Component} from 'react';

import ErrorMessage from '../error-message';

class ErrorBoundary extends Component {

    state = {
        hasError: false
    }
    
    componentDidCatch(){
        this.setState({hasError: true});
    }

    render(){
        if(this.state.hasError) return <ErrorMessage message={'Something went wrong, please try again later :)'} />;

        return this.props.children;
    }
}

export default ErrorBoundary;