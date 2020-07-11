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
      this.setState(() => ({ query: query }), () => this.finder(query))
  }
}

finder=(query)=>{
  BooksAPI.search(query)
  .then((responses)=>{
    console.log(responses);
    if (query !== this.state.query) {return;}
    if(responses.error !== 'empty query' ){
      let fresponses=responses.filter((response)=>{ return response.hasOwnProperty('imageLinks') && response.hasOwnProperty('authors') && response.imageLinks.hasOwnProperty('thumbnail')});
      if(fresponses.length!==0){
        const newresp=fresponses.map((fresponse)=>{
          if(!fresponse.hasOwnProperty('shelf')){
            let id=fresponse.id;
            BooksAPI.update(fresponse, 'none');
            return id;
          }
          else{return fresponse.id;}
        })
        const toState=newresp.map((newres)=>BooksAPI.get(newres));
        this.setState({searchedBooks:toState});
      }
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