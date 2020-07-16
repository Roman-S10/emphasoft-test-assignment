import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import UserListItem from '../user-list-item';
import Loader from '../loader';
import './user-list.css';
import SearchPanel from '../search-panel';
import ErrorMessage from '../error-message';

class UserList extends Component {

    state = {
        users: [],
        loading: true,
        error: null,
        sortType: '🠕🠗',
        searchTerm: ''
    }

    componentDidMount(){
        if(this.props.isLoggedIn()){
            this.props.getUsers()
            .then(this.onUsersLoading)
            .catch(() => this.onError('Something went wrong, please try again later :)'));
        }
    }

    onUsersLoading = (users) => {
        this.setState({users, loading: false});
    }

    onError = (error) => {
        this.setState({error, loading: false});
    }

    renderUserList = (users) => users.map(user => {
        return <UserListItem user = {user} key={user.id} />
    });

    sortingById = () => {
        this.setState(({users, sortType}) =>{
            const newUsers = [...users];
            const newSortType = sortType === 'ASC' ? 'DESC' : 'ASC';
            
            newUsers.sort((a, b) => {
                return sortType === 'ASC' ? b.id - a.id : a.id - b.id;
            });

            return {
                users: newUsers,
                sortType: newSortType
            }
        })
    }

    userSearch(users, term){
        return users.filter(user => user.username.toLowerCase().includes(term.toLowerCase()));
    }
    
    onSearch = (term) => {
        this.setState({searchTerm: term.toLowerCase()});
    }

    render(){
        if(!this.props.isLoggedIn()) return <Redirect to="/login" />;

        const {loading, users, searchTerm, sortType, error} = this.state;
        const errorMessage = error ? <ErrorMessage message = {error}/> : null;
        const loader = loading ? <Loader/> : null;
        const usersListSearch = this.userSearch(users, searchTerm);
        
        const content = !loading && !error
        ? <div>
            <SearchPanel onSearch={this.onSearch} /> 
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th scope="col" 
                        className="th-pointer"
                        onClick={this.sortingById} ># {sortType}</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Username</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderUserList(usersListSearch)}
                </tbody>
            </table>
        </div>
        :null;

        return(
            <>
            {errorMessage}
             {loader}
            {content}
            </>
        );
    }
}

export default UserList;