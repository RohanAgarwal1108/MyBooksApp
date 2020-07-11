import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class Search extends Component{

  constructor(props){
    super(props);
    this.state={
      query:'',
      searchedBooks:[],
    }
  }

  updateQuery=(query)=>{
    if(query===null||query==='')
    {
      this.setState(()=>({query:''}))
      this.setState(()=>({
        // when there is no book results
        searchedBooks:[] 
      }))
    }
    else{
      this.setState({ query: query })
      this.finder(query)
  }
}

finder = (query) => {
  BooksAPI.search(query).then((responses) => {
    console.log(responses);
    if (query !== this.state.query) {
      return;
    }
    if (responses.error !== "empty query") {
      let fresponses = responses.filter((response) => {
        return (
          response.hasOwnProperty("imageLinks") &&
          response.hasOwnProperty("authors") &&
          response.imageLinks.hasOwnProperty("thumbnail")
        );
      });
      console.log("fresponses", fresponses);
      if (fresponses.length !== 0) {
        const fresponses1=this.setshelf(fresponses);
        this.setState({ searchedBooks: fresponses1 });
      } else {
        this.setState(() => ({
          searchedBooks: [],
        }));
      }
    } else {
      this.setState(() => ({
        searchedBooks: [],
      }));
    }
  });
};

setshelf=(fresponses)=>
{
  const {booklist}=this.props;
  const fresponses1=fresponses.map((fresponse)=>{
    const elementsIndex = booklist.findIndex(book => book.id === fresponse.id )
    if(elementsIndex!==-1)
    {
      return fresponse= {...fresponse, shelf: booklist[elementsIndex].shelf}
    }
    else{
      return fresponse= {...fresponse, shelf: 'none'}
    }
    })
    return fresponses1;
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
          <Book bookUpdate={this.props.bookUpdate} book_list={this.state.searchedBooks}/>
        </div>
      </div>);
    }
}

export default Search;