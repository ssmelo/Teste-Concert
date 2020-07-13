import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Books } from "../../models/books";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = " http://localhost:3000/books"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Books[]>{
    return this.http.get<Books[]>(this.url);
  }

  createBook(book: Books): Observable<Books> {
    return this.http.post<Books>(this.url, JSON.stringify(book), this.httpOptions)      
  }

  deleteBook(book: Books){
    return this.http.delete<Books>(this.url + '/' + book.id, this.httpOptions).subscribe(
      res => console.log(book.id)
    )
  }

  updateBook(book: Books, id: number){    
    return this.http.put<Books>(this.url + '/' + id, JSON.stringify(book), this.httpOptions)
  }
}
