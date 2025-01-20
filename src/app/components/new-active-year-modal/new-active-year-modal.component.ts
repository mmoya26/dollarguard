import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '@components/shared/modal/modal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-active-year-modal',
  standalone: true,
  imports: [ModalComponent, InputNumberModule, FormsModule],
  templateUrl: './new-active-year-modal.component.html',
  styleUrl: './new-active-year-modal.component.css'
})
export class NewActiveYearModalComponent {

  @Input({ required: true }) activeYears: string[] = [];
  @Input({required: true}) isOpen: boolean = false;

  @Output() onModalClose: EventEmitter<void> = new EventEmitter<void>();

  yearAlreadyExistsError = false;
  newYearFormValue: number | null = null;

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

  closeNewActiveYearModal() {
    this.yearAlreadyExistsError = false;
    this.newYearFormValue = null;
    this.onModalClose.emit();
  }

  constructor(private userPreferences: UserPreferencesService, private router: Router) {}
}
