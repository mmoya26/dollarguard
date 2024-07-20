import { Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';

export const routes: Routes = [
    {path: 'expenses/:year/:month', component: ExpensesComponent}
];
