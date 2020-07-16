import React, {Component} from 'react';

import './search-panel.css';

class SearchPanel extends Component {

    state = {
        term : ''
    }

    onInputChange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearch(term);
    }

    render(){
        return (
            <input type="text" name="search-panel" 
            placeholder="Search by username" 
            value={this.state.term}
            onChange={this.onInputChange}
            />
        )
    }
}

export default SearchPanel;