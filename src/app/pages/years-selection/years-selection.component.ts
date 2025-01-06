import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPreferencesService } from '../../services/user-preferences.service';

@Component({
  selector: 'app-years-selection',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './years-selection.component.html',
  styleUrl: './years-selection.component.css'
})
export class YearsSelectionComponent implements OnInit {

  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  activeYears$!: Observable<string[]>;

  ngOnInit(): void {
    this.activeYears$ = this.userPreferences.getUserActiveYears();
  }

  constructor(private userPreferences: UserPreferencesService) {}
}
