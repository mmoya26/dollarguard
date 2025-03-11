import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [DialogModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input({required: true}) headerTitle!: string;
  @Input({required: true}) isOpen!: boolean;
  @Input() modalId: string | null = null;

  @Output() onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeModal() {
    this.isOpen = false;
    this.onModalClose.emit(false);
  }
}
