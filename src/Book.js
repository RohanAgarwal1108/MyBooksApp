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
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:book_list_item.img_url }}></div>
                            <div className="book-shelf-changer">
                              <select value={book_list_item.status} onChange={(event)=>bookUpdate(book_list_item.name, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="Currently Reading">Currently Reading</option>
                                <option value="Want to Read">Want to Read</option>
                                <option value="Read">Read</option>
                                <option value="None">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book_list_item.name}</div>
                          <div className="book-authors">{book_list_item.author}</div>
                        </div>
                      </li>)}
                    </ol>
                  </div>
        );
    }
}

export default Book;