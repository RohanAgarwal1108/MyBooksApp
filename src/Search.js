import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      query:'',
      searchedBooks:[],
    }
  }
  updateQuery=(query)=>{
    this.setState(()=>({query:query.trim()}))
    this.finder(query.trim());
}
finder=(query)=>{
  BooksAPI.search(query)
  .then((responses)=>{
    let myvar=[]
    responses.map((response)=>
    myvar.concat([{
      name:response.title,
      author:response.authors,
      img_url:response.imageLinks.thumbnail
    }])
    )
    this.setState(()=>({
      searchedBooks:myvar
    }))
  })
}
 render(){
   const query=this.state.query;
      const {handleSearch}=this.props;
        return(<div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={()=>handleSearch()}>Close</button>
          <div className="search-books-input-wrapper">
            <input type="text" value={query} placeholder="Search by title or author" onChange={(event)=>{this.updateQuery(event.target.value)}}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.searchedBooks.length!==0 ? JSON.stringify(this.state.searchedBooks): JSON.stringify(this.state)}
          <ol className="books-grid">
          </ol>
        </div>
      </div>);
    }
}

export default Search;