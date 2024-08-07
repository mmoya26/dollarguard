import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-years-selection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './years-selection.component.html',
  styleUrl: './years-selection.component.css'
})
export class YearsSelectionComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  years: String[] = [];

  userProfile: any;

  ngOnInit(): void {
    this.subscription = this.expensesService.getUsersYearsForExpenses().subscribe(years => {
      this.years = years;
    });
    
    if(this.authService.identityClaims) {
      this.authService.userProfile.subscribe(profile =>  {
        console.log(profile)
        this.userProfile = profile
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private expensesService: ExpensesService, private authService: AuthService) {}
}
