import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submitedForm = false

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  login() {
    this.submitedForm = true;

    if (this.loginForm.invalid) return;

    console.log('Valid');
    this.clearForm();
  }

  clearForm() {
    this.loginForm.reset({email: '', password: ''});
    this.submitedForm = false;
  }

  constructor(private fb: FormBuilder) {}
}
