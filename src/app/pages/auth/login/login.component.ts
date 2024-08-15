import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submitedForm = false
  invalidCredentials = false
  loginLoading = false
  unknownError = false

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  login() {
    this.submitedForm = true;

    if (this.loginForm.invalid) return;

    this.clearErrorMessages();
    
    const email = this.loginForm.get('email')?.value!
    const password = this.loginForm.get('password')?.value!

    this.authService.login(email, password).subscribe({
      next: (_) => {
        this.router.navigate(['/expenses']);
      },

      error: (e) => {
        if (e.status === 401) {
          this.invalidCredentials = true
        } else {{
          this.unknownError = true
        }}

        console.error('Error when trying to log in, check your credentials', e);
        this.loginLoading = false
      }
    });

    this.loginLoading = true; 
  }

  clearErrorMessages() {
    this.invalidCredentials = false;
    this.unknownError = false;
  }

  clearForm() {
    this.loginForm.reset({email: '', password: ''});
    this.submitedForm = false;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
}
