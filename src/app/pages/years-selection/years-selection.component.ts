import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { NewActiveYearModalComponent } from '@components/new-active-year-modal/new-active-year-modal.component';
import { FooterComponent } from '@components/shared/footer/footer.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-years-selection',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DialogModule, InputNumberModule, NewActiveYearModalComponent, FooterComponent, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './years-selection.component.html',
  styleUrl: './years-selection.component.css'
})
export class YearsSelectionComponent implements OnInit {
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  activeYears$!: Observable<number[]>;

  isNewActiveYearModalOpen = false;

  removeMode = signal(false);

  ngOnInit(): void {
    this.activeYears$ = this.userPreferences.getUserActiveYears();
  }

  openNewYearModal() {
    this.isNewActiveYearModalOpen = true;
  }

  toggleRemoveMode() {
    this.removeMode.set(!this.removeMode());
  }

  removeYear(year: number) {
    const deleteYear = (year: number) => {
      this.userPreferences.removeActiveYear(year).subscribe({
        next: () => {
          this.activeYears$ = this.activeYears$.pipe(
            map(years => years.filter(activeYear => activeYear !== year))
          )
        }
      });
    }

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteYear(year),
      reject: () => console.log('cancel delete year')
    });
  }

  constructor(private userPreferences: UserPreferencesService, private router: Router, private confirmationService: ConfirmationService) { }
}
