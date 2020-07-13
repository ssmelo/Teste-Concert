import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Books } from 'src/app/models/books';
import { Router } from '@angular/router';
import { BookService } from 'src/app/pages/books/book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  public updateBookForm: FormGroup;
  public book: Books;   
  @Output() whenUpdate: EventEmitter<string> = new EventEmitter();
  @Input() bookId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService  
  ) { }

  get formName() { return this.updateBookForm.controls.name; }
  get formAuthor() { return this.updateBookForm.controls.author; }
  get formPublishing() { return this.updateBookForm.controls.publishing; }

  private initForm(){
    this.updateBookForm = this.formBuilder.group({
      name: ["", Validators.required],
      author: ["", Validators.required],
      publishing: ["", Validators.required]
    })    
  }  

  public updateBook(){
    if(!this.updateBookForm.valid){
      this.updateBookForm.markAllAsTouched();
      this.updateBookForm.markAsDirty();
    } else{
      this.bookService.updateBook(this.updateBookForm.value, this.bookId).subscribe(
        res => this.book = res
      )
  
      setTimeout(() => {
        this.whenUpdate.emit('list');
      }, 2000);
    }     
    
  }

  ngOnInit(): void {     
    this.initForm();    
  }
}
