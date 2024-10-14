import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { SignUpComponent } from '../../pages/auth/signup/signup.component';

export const authRoutes: Routes = [
    {path: '', component: AuthLayoutComponent, children: [
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'signup',
            component: SignUpComponent
        }
    ]}
];