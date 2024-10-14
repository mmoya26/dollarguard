import { Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { YearsSelectionComponent } from './pages/years-selection/years-selection.component';
import { AuthGuard } from './guards/auth.guard';
import { authRoutes } from './layouts/auth-layout/auth-layout.routes';

export const routes: Routes = [
    {path: 'expenses/:year/:month', component: ExpensesComponent, canActivate: [AuthGuard]},
    {path: 'expenses', component: YearsSelectionComponent, canActivate: [AuthGuard]},
    ...authRoutes
];
