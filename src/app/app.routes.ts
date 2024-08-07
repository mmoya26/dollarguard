import { Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { YearsSelectionComponent } from './pages/years-selection/years-selection.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'expenses/:year/:month', component: ExpensesComponent},
    {path: 'expenses', component: YearsSelectionComponent}
];
