import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from "../../pages/books/book.service";
import { Books } from 'src/app/models/books';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public responseBooks: Books[];  
  @Output() whenAdd: EventEmitter<String> = new EventEmitter();
  @Output() whenUpdate: EventEmitter<{ component: string, bookId: number }> = new EventEmitter();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      res => this.responseBooks = res
    );     
  }

  public emitAdd(){
    this.whenAdd.emit('create');
  }

  public emitUpdate(bookId: number){
    this.whenUpdate.emit({ component: 'update', bookId });
  }

  deleteBook(book: Books){
    this.bookService.deleteBook(book);
    this.ngOnInit();
  }  

}
