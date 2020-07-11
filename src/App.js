import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({
        books: res,
      })
    })
  }

  searchHandling = () => {
    this.setState({ showSearchPage: false });
  }

  updateBook =(targetBook, newShelf) => {
    const id=targetBook.id;
    const elementsIndex = this.state.books.findIndex(book => book.id === targetBook.id ) 
    let newArray = this.state.books
    BooksAPI.update(targetBook, newShelf).then(()=>{
      BooksAPI.get(id)
      .then((res)=>{
        newArray[elementsIndex] = res;
        this.setState({
          books: newArray,
        })
      })})
    /*
    BooksAPI.update(targetBook, newShelf).then(()=>{
    BooksAPI.getAll()
      .then((res) => {
        this.setState({
          books: res,
        })
      })})*/
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={() => (
          <Search handleSearch={this.searchHandling} bookUpdate={this.updateBook} booklist={this.state.books} />)}/>
          <Route exact path='/' render={()=>(
          <BookShelf bookUpdate={this.updateBook} booklist={this.state.books} />)}/>
        <div className="open-search">
          <Link to='/search'><button>Add a book</button></Link>
        </div>
      </div>
    );
  }
}

export default BooksApp