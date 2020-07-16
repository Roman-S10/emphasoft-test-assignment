import React from 'react';

const UserListItem = (props) => {
    const {id, first_name, last_name, username} = props.user;
    
    const lastName = last_name.length > 45 ? last_name.substring(0, 25) + "..." : last_name;
    return(
        <tr>
            <th>{id}</th>
            <td>{first_name}</td>
            <td>{lastName}</td> 
            <td>{username}</td> 
        </tr>
    );
}

export default UserListItem;