import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, InputGroupAddonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submitedForm = false
  loginLoading = false
  errorMessage: string | null = null

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.submitedForm = true;

    if (this.loginForm.invalid) return;

    this.loginLoading = true;
    this.clearErrorMessages();
    
    const username = this.loginForm.get('username')?.value!
    const password = this.loginForm.get('password')?.value!

    this.authService.login(username, password).subscribe({
      next: (_) => {
        this.router.navigate(['/expenses']);
      },

      error: (e) => {
        console.log(e)
        if (e.status === 401) {
          this.errorMessage = "Unable to log you in, please check your credentials."
        } else {
          this.errorMessage = "There was an error when trying to log you in, please try again later."
        }

        console.error('Error when trying to log in, check your credentials', e);
        this.loginLoading = false
      }
    });
  }

  clearErrorMessages() {
    this.errorMessage = null
  }

  clearForm() {
    this.loginForm.reset({ username: '', password: '' });
    this.submitedForm = false;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
}
