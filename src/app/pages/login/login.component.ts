import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

    this.authService.login(this.loginForm.get('email')?.value!, this.loginForm.get('password')?.value!).subscribe({
      next: () => {
        console.log('logged in');
        this.router.navigate(['/expenses']);
      }
    });
    
  }

  clearForm() {
    this.loginForm.reset({email: '', password: ''});
    this.submitedForm = false;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
}
