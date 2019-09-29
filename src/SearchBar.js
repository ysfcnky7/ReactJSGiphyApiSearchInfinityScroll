import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }
    componentDidMount(term) {
        this.setState({ term });
        // this.props.onTermChange("love");
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <input  onChange={event => this.onInputChange(event.target.value)} /> 
                {/* defaultValue="love" */}
            </div>
        );
    }
}
export default SearchBar;