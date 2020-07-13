import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacts } from "../../models/contacts";
import { ContactService } from 'src/app/pages/contacts/contact.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  public createContactForm: FormGroup;

  public contact: Contacts;
  @Output() whenCreate: EventEmitter<String> = new EventEmitter();  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
     
    this.initForm();
  }

  private initForm(){
    this.createContactForm = this.formBuilder.group({
      name: ["", Validators.required],
      cellphone: ["", Validators.required],
      email: ["", Validators.required],
      age: ["", Validators.required],
      bestFriend: ["", Validators.required],
      professions: ["", Validators.required],
      birthday: ["", Validators.required]
    })    
  }  
  
  public createContact(){
    this.contactService.createContact(this.createContactForm.value).subscribe(
      res => this.contact = res
    )

    setTimeout(() => {
      this.whenCreate.emit('list');
    }, 2000);
  }

}
