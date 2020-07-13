import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Contacts } from "../../models/contacts";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = " http://localhost:3000/contacts"
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(private http: HttpClient) { }

  public getContacts(): Observable<Contacts[]>{
    return this.http.get<Contacts[]>(this.url);
  }

  public createContact(contact: Contacts): Observable<Contacts> {
    return this.http.post<Contacts>(this.url, JSON.stringify(contact), this.httpOptions)      
  }

  public deleteContact(contact: Contacts){
    return this.http.delete<Contacts>(this.url + '/' + contact.id, this.httpOptions).subscribe(
      res => console.log(contact.id)
    )
  }

  public updateContact(contact: Contacts, id: number){    
    return this.http.put<Contacts>(this.url + '/' + id, JSON.stringify(contact), this.httpOptions)
  }
}
