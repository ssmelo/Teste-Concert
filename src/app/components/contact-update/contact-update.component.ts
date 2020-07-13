import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contacts } from 'src/app/models/contacts';
import { Router } from '@angular/router';
import { ContactService} from 'src/app/pages/contacts/contact.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  public updateContactForm: FormGroup;
  public contact: Contacts;   
  @Output() whenUpdate: EventEmitter<string> = new EventEmitter();
  @Input() contactId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: ContactService
  ) { } 

  private initForm(){
    this.updateContactForm = this.formBuilder.group({
      name: ["", Validators.required],
      cellphone: ["", Validators.required],
      email: ["", Validators.required],
      age: ["", Validators.required],
      bestFriend: ["", Validators.required],
      professions: ["", Validators.required],
      birthday: ["", Validators.required]
    })   
  }  

  public updateContact(){         
    this.contactService.updateContact(this.updateContactForm.value, this.contactId).subscribe(
      res => this.contact = res
    )   

    setTimeout(() => {
      this.whenUpdate.emit('list');
    }, 2000);
  }

  ngOnInit(): void {
    this.initForm();
  }

}
