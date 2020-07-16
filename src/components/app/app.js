import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import AppHeader from '../app-header';
import LoginForm from '../login-form';
import UserList from '../user-list';
import ErrorBoundary from '../error-boundary';
import EmphasoftApiService from '../../services/emphasoft-api-service';

function App() {
  const emphasoftApiService = new EmphasoftApiService();
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Route path="/" render={ () => <AppHeader logOut={emphasoftApiService.logOut} isLoggedIn={emphasoftApiService.isLoggedIn} /> } />
          <Route path="/login" render={ () => <LoginForm/> } exact />
          <Route path="/users" render={ () => {
            return <UserList 
              getUsers={emphasoftApiService.getUsers}
              isLoggedIn={emphasoftApiService.isLoggedIn}
              />
            }
          } />
        </div>
        
        <Redirect from='/' to= {emphasoftApiService.isLoggedIn() ? '/users' : '/login'} />
      </Router>
    </ErrorBoundary>
  );
}

export default App;