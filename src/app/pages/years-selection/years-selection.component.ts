import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { NewActiveYearModalComponent } from '@components/new-active-year-modal/new-active-year-modal.component';
import { FooterComponent } from '@components/shared/footer/footer.component';

@Component({
  selector: 'app-years-selection',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DialogModule, InputNumberModule, NewActiveYearModalComponent, FooterComponent],
  templateUrl: './years-selection.component.html',
  styleUrl: './years-selection.component.css'
})
export class YearsSelectionComponent implements OnInit {
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  activeYears$!: Observable<number[]>;
  activeYears: number[] = [];

  isNewActiveYearModalOpen = false;

  ngOnInit(): void {
    this.activeYears$ = this.userPreferences.getUserActiveYears();

    this.activeYears$.subscribe(years => {
      this.activeYears = years;
    })
  }

  openNewYearModal() {
    this.isNewActiveYearModalOpen = true;
  }
  
  constructor(private userPreferences: UserPreferencesService, private router: Router) {}
}
