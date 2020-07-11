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
    this.setState(()=>({query:query}))
    this.finder(query);
  }
}

finder=(query)=>{
  BooksAPI.search(query)
  .then((responses)=>{
    console.log(responses);
    if(responses.error !== 'empty query' ){
      let fresponses=responses.filter((response)=>{ return response.hasOwnProperty('imageLinks') && response.hasOwnProperty('authors') && response.imageLinks.hasOwnProperty('thumbnail')});
      if(fresponses.length!==0){
      let newBooks=[]
    newBooks = fresponses.map((fresponse) =>({
      name: fresponse.title,
      author: fresponse.authors,
      img_url: `url(${fresponse.imageLinks.thumbnail})`,
      status:'None',
      id:fresponse.id
    }))
    //let myvar1=this.stateChanger(newBooks);
    this.setState({
      //searchedBooks:myvar1
      searchedBooks:newBooks
    })}
    else{
      this.setState(()=>({
        searchedBooks:[] 
      }))
    }
    }else{
      this.setState(()=>({
        searchedBooks:[] 
      }))
    }
  })
}

/*stateChanger=(newBooks)=>{
  const newsearchedBooks=newBooks;
  const {booklist}=this.props;
  let myvar1=newsearchedBooks.map((newsearchedBooks_item)=>
  booklist.map((booklist_item)=>{if(booklist_item.id===newsearchedBooks_item.id){
    newsearchedBooks_item.status=booklist_item.status;
    return newsearchedBooks_item;
  }
  return newsearchedBooks_item;
}
  )
  )
  return myvar1;
}*/

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