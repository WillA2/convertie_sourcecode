import React from 'react'


class Search extends React.Component {
    state={
        id :''
    }

    onSearchChange = e => {
        this.setState({id: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault()
        var youtubeLink = this.state.id
        var initialIndex = youtubeLink.indexOf('list=')
        if (initialIndex !== -1){
            youtubeLink = youtubeLink.substring(initialIndex + 5)
        }
        this.props.onSearch(youtubeLink)
    }
    render(){ 
        return (
            <form
            onSubmit = {this.onSubmit}>
                <div>
                    <input 
                        id = 'a'
                        value = {this.state.id}
                        onChange={this.onSearchChange}
                        placeholder = 'Search'
                    />
                </div>
                <input type='submit' value='Search playlist'/>
            </form>
        )
    }
   
    
}

export default Search
