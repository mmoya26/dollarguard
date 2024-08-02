import { Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { YearsSelectionComponent } from './pages/years-selection/years-selection.component';

export const routes: Routes = [
    {path: 'expenses/:year/:month', component: ExpensesComponent},
    {path: 'expenses', component: YearsSelectionComponent}
];
