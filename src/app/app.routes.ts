import { Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { YearsSelectionComponent } from './pages/years-selection/years-selection.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/register/signup.component';

export const routes: Routes = [
    {path: 'expenses/:year/:month', component: ExpensesComponent},
    {path: 'expenses', component: YearsSelectionComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
];
