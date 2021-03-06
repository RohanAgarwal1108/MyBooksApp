import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import { Link } from 'react-router-dom';

class Search extends Component{

  constructor(props){
    super(props);
    this.state={
      query:'',
      searchedBooks:[],
      message:0
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
      this.setState({message:0})
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
        this.setState({message:2})
        this.setState({ searchedBooks: fresponses1 });
      } else {
        this.setState(() => ({
          searchedBooks: [],
          message:1
        }));
      }
    } else {
      this.setState(() => ({
        searchedBooks: [],
        message:1
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
        <Link to='/'><button className="close-search" onClick={()=>handleSearch()}>Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={query} placeholder="Search by title or author" onChange={(event)=>{this.updateQuery(event.target.value)}}/>
          </div>
        </div>
        
        <div className="search-books-results">
        {this.state.message===2?(
          <Book bookUpdate={this.props.bookUpdate} book_list={this.state.searchedBooks}/>):this.state.message===1?(<p className='message'>Please try another search term</p>):
          (<p className='message'>Make a search</p>)}
        </div>
      </div>);
    }
}

export default Search;