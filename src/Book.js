import React, { Component } from 'react'

class Book extends Component{
    render(){
        const {bookUpdate, book_list}=this.props;
        return(
            <div className="bookshelf-books">
                    <ol className="books-grid">
                    {book_list.map((book_list_item)=>
                      <li key={book_list_item.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book_list_item.imageLinks.thumbnail}`}}></div>
                            <div className="book-shelf-changer">
                              <select value={book_list_item.shelf} onChange={(event)=>bookUpdate(book_list_item, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book_list_item.title}</div>
                          <div className="book-authors">{book_list_item.authors}</div>
                        </div>
                      </li>)}
                    </ol>
                  </div>
        );
    }
}

export default Book;