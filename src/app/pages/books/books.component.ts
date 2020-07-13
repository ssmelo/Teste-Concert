import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public actualComponent: string = "list";
  public bookId: number;
  public isLoading: boolean = true;

  constructor() { }

  navigate(response: any){
    if(response.bookId){
      this.bookId = response.bookId;
      this.actualComponent = response.component;      
    }
    else{
      this.actualComponent = response;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);    
  }  

}
