import { Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { YearsSelectionComponent } from './pages/years-selection/years-selection.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'expenses/:year/:month', component: ExpensesComponent},
    {path: 'expenses', component: YearsSelectionComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];
