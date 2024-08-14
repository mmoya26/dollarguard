import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  submitedForm = false

  userAlreadyExists = false

  signup() {
    this.submitedForm = true

    if (this.signUpForm.invalid) return;

    const name = this.signUpForm.get('name')?.value!;
    const email = this.signUpForm.get('email')?.value!
    const password = this.signUpForm.get('password')?.value!

    this.authService.signUp(name, email, password).subscribe({
      next: (_) => {
        this.router.navigate(['/expenses']);
      },
      error: (e) => {
        console.error('Error while signing up', e);
        this.userAlreadyExists = true;
      }
    });
  }

  get name() {
    return this.signUpForm.get('name')
  }

  get email() {
    return this.signUpForm.get('email')
  }

  get password() {
    return this.signUpForm.get('password');
  }

  clearForm() {
    this.signUpForm.reset({name: '', email: '', password: ''});
    this.submitedForm = false;
  }

  resetPage() {
    this.userAlreadyExists = false;
    this.clearForm();
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
}
