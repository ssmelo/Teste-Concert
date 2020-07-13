import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contacts } from 'src/app/models/contacts';
import { ContactService } from "../../pages/contacts/contact.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public responseContacts: Contacts[];
  @Output() whenAdd: EventEmitter<String> = new EventEmitter();
  @Output() whenUpdate: EventEmitter<{ component: string, contactId: number }> = new EventEmitter();

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      res => {
        this.responseContacts =res;        
      }
    )                
  }

  public emitAdd(){
    this.whenAdd.emit('create');
  }

  public emitUpdate(contactId: number){
    this.whenUpdate.emit({ component: 'update', contactId });
  }

  deleteContact(contact: Contacts){
    this.contactService.deleteContact(contact);
    this.ngOnInit();
  }  
}
