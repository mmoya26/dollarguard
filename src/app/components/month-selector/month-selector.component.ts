import { Component, Input, OnInit } from '@angular/core';
import { getMonthName } from '@helpers/getMonthName';
import { RouterLink, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-month-selector',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './month-selector.component.html',
    animations: [
        trigger('openMonthsMenu', [
            state('open', style({
                opacity: 1,
                visibility: 'visible'
            })),
            state('close', style({
                opacity: 0,
                visibility: 'hidden'
            })),
            // From open to close & from close to open animate in 0.2s
            transition('open <=> close', [animate('0.2s')]),
        ])
    ]
})
export class MonthSelectorComponent implements OnInit {
  @Input({ required: true }) month = ''
  @Input({ required: true }) year = ''

  months = [
    { name: "January", index: 1 },
    { name: "February", index: 2 },
    { name: "March", index: 3 },
    { name: "April", index: 4 },
    { name: "May", index: 5 },
    { name: "June", index: 6 },
    { name: "July", index: 7 },
    { name: "August", index: 8 },
    { name: "September", index: 9 },
    { name: "October", index: 10 },
    { name: "November", index: 11 },
    { name: "December", index: 12 }
  ];

  displayMonths = false
  nameOfMonth = ''

  ngOnInit(): void {
    const monthToRemove = getMonthName(new Date(Number(this.year), Number(this.month) - 1, 1));
    this.months = this.removeCurrentMonthFromArray(monthToRemove);

    this.nameOfMonth = getMonthName(new Date(Number(this.year), Number(this.month) - 1))
  }

  removeCurrentMonthFromArray(m: string) {
    return this.months.filter(month => month.name.toLocaleLowerCase() !== m.toLocaleLowerCase());
  }

  toggleMonthsView() {
    this.displayMonths = !this.displayMonths
  }

  refreshRoute(year: string, monthIndex: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([ `/expenses/${year}/${monthIndex}`]);
    });

    this.toggleMonthsView();
  }

  constructor(private router: Router) { }
}
