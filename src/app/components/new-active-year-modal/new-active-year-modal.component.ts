import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '@components/shared/modal/modal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-new-active-year-modal',
    imports: [ModalComponent, InputNumberModule, FormsModule],
    standalone: true,
    templateUrl: './new-active-year-modal.component.html',
    styleUrl: './new-active-year-modal.component.css'
})
export class NewActiveYearModalComponent {
  @Input({ required: true }) activeYears: number[] = [];
  @Input({ required: true }) isOpen: boolean = false;

  @Output() onModalClose: EventEmitter<void> = new EventEmitter<void>();

  yearAlreadyExistsError = false;
  newYearFormValue: number | null = null;

  isYearTracked() {
    return this.activeYears.includes(this.newYearFormValue!);
  }

  patchActiveYears(event: Event) {
    event.preventDefault();

    if (this.newYearFormValue === null) {
      return;
    }

    if (this.isYearTracked()) {
      this.yearAlreadyExistsError = true;
      return;
    }

    this.userPreferences.patchActiveYears(this.newYearFormValue).subscribe({
      next: () => {
        this.router.navigateByUrl(`${this.router.url}/${this.newYearFormValue}/${new Date().getMonth() + 1}`);
      }
    });
  }

  closeNewActiveYearModal() {
    this.yearAlreadyExistsError = false;
    this.newYearFormValue = null;
    this.onModalClose.emit();
  }

  constructor(private userPreferences: UserPreferencesService, private router: Router) { }
}
