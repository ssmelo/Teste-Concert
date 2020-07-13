import { Component, OnInit } from '@angular/core';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public username: String = "concert";
  public password: String = "prova";
  public matchData: Boolean = true;
  public isLoading: boolean = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router    
  ) { }

  get formUsername() { return this.loginForm.controls.username; }
  get formPassword() { return this.loginForm.controls.password; }

  private initForm(){
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })    
  }
  
  public login(){

    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
    } else {
      const usernameValue = this.loginForm.controls.username.value;
      const passwordValue = this.loginForm.controls.password.value;
      console.log(this.loginForm)

      if(usernameValue === this.username && passwordValue === this.password){
        this.router.navigate(['/books'])
      } else{
        this.matchData = false;

        setTimeout(() => {
          this.matchData = true;
        }, 2000);
      }
    }
    
  }

  ngOnInit(): void {
    this.initForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); 
  }

  



}
