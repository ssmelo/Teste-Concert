import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/pages/books/book.service';
import { Books } from 'src/app/models/books';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  public createBookForm: FormGroup;
  public book: Books;  
  @Output() whenCreate: EventEmitter<String> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService,
      
  ) { }

  private initForm(){
    this.createBookForm = this.formBuilder.group({
      name: ["", Validators.required],
      author: ["", Validators.required],
      publishing: ["", Validators.required]
    })    
  }
  
  get formName() { return this.createBookForm.controls.name; }
  get formAuthor() { return this.createBookForm.controls.author; }
  get formPublishing() { return this.createBookForm.controls.publishing; }

  public createBook(){
    if(!this.createBookForm.valid){
      this.createBookForm.markAllAsTouched();
      this.createBookForm.markAsDirty();
    } else{
      this.bookService.createBook(this.createBookForm.value).subscribe(
        res => this.book = res
      )
  
      setTimeout(() => {
        this.whenCreate.emit('list');
      }, 2000);
    }
    
  }

  ngOnInit(): void {
    
    this.initForm();
  }

}
