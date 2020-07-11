import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
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

  updateBook = (targetBook, newShelf) => {
    BooksAPI.update(targetBook, newShelf).then(()=>{
    BooksAPI.getAll()
      .then((res) => {
        this.setState({
          books: res,
        })
      })})
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search handleSearch={this.searchHandling} bookUpdate={this.updateBook} booklist={this.state.books} />
        ) : (
            <BookShelf bookUpdate={this.updateBook} booklist={this.state.books} />)}
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default BooksApp