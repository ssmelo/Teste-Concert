import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public actualComponent: string = "list";
  public contactId: number;
  public isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);    
  }

  navigate(response: any){
    if(response.contactId){
      this.contactId = response.contactId;
      this.actualComponent = response.component;      
    }
    else{
      this.actualComponent = response;
    }
  }

}
