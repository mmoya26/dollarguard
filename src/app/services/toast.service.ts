import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',

})
export class ToastService {
  createToastMessage(severity: string, summaryTitle: string, detailMessage: string) {
    const lowerSeverity = severity.toLowerCase();
    this.messageService.add({ severity: lowerSeverity, summary: summaryTitle, detail: detailMessage});
  }

  constructor(private messageService: MessageService) { }
}
