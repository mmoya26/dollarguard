import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';

@Component({
  selector: 'app-years-selection',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DialogModule, FormsModule, InputNumberModule],
  templateUrl: './years-selection.component.html',
  styleUrl: './years-selection.component.css'
})
export class YearsSelectionComponent implements OnInit {
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  activeYears$!: Observable<string[]>;
  activeYears: string[] = [];
  isNewYearModalOpen = false;
  newYearFormValue: number | null = null;
  yearAlreadyExistsError = false;

  ngOnInit(): void {
    this.activeYears$ = this.userPreferences.getUserActiveYears();

    this.activeYears$.subscribe(years => {
      this.activeYears = years;
    })
  }

  openNewYearModal() {
    this.newYearFormValue = null
    this.isNewYearModalOpen = true;
  }

  isYearTracked() {
    return this.activeYears.includes(String(this.newYearFormValue));
  }

  patchActiveYears() {

    if (this.isYearTracked()) {
      this.yearAlreadyExistsError = true;
      return;
    }

    this.userPreferences.patchActiveYears(String(this.newYearFormValue)).subscribe({
      next: (_) => {
        this.router.navigateByUrl(`${this.router.url}/${this.newYearFormValue}/${new Date().getMonth() + 1}`);
      },
        
      error: (err) => {
        console.log('Error attempting to add active year', err);

        // If 409 it means that the year already exists
        if (err.status === 409) {
          this.yearAlreadyExistsError = true;
        }
      }
    });
  }


  test() {
    if (this.yearAlreadyExistsError) {
      this.yearAlreadyExistsError = false;
    }
  }

  constructor(private userPreferences: UserPreferencesService, private router: Router) {}
}
