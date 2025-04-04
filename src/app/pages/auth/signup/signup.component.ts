import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterLink, InputGroupAddonModule, InputGroupModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  submitedForm = false
  signUpLoading = false
  errorMessage: string | null = null;

  signup() {
    this.submitedForm = true

    if (this.signUpForm.invalid) return;

    this.clearErrorMessages();

    this.signUpLoading = true

    const name = this.signUpForm.get('name')?.value!;
    const username = this.signUpForm.get('username')?.value!
    const password = this.signUpForm.get('password')?.value!

    this.authService.signUp(name, username, password).subscribe({
      next: (_) => {
        this.router.navigate(['/expenses']);
      },
      error: (e) => {
        if (e.status === 400) {
          this.errorMessage = 'The email address is already being used, please choose a different email.';
        } else {
          this.errorMessage = 'There was an in issue when trying to sign you up, please try again later.';
        }

        console.error('Error while signing up', e);
        this.signUpLoading = false;
      }
    });
  }

  get name() {
    return this.signUpForm.get('name')
  }

  get username() {
    return this.signUpForm.get('username')
  }

  get password() {
    return this.signUpForm.get('password');
  }

  clearForm() {
    this.signUpForm.reset({name: '', username: '', password: ''});
    this.submitedForm = false;
  }

  clearErrorMessages() {
    this.errorMessage = null;
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
}
