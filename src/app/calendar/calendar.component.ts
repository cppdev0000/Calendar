import { Component, HostListener, Input } from '@angular/core';
import { addDays, addWeeks, format, isToday, startOfWeek } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  @Input()
  get startDate(): Date { return this._startDate; }
  set startDate(startDate: Date) {
    this._startDate = startDate;
    for (let index = 0; index < 35; index++) {
      this.dates[index] = addDays(this.startDate, index);
    }
    this.currentMonth = this.dates[17].getMonth();
    this.months = format(this.startDate, 'MMMM yyyy') + ' - ' + format(addDays(this.startDate, 35), 'MMMM yyyy');
  }

  private _startDate: Date;
  dates: Date[] = [];
  months: string;
  currentMonth: number;

  // *************************************************************************
  @HostListener("mousewheel", ["$event"])
  onMouseWheel(event: WheelEvent) {
    this.startDate = addWeeks(this.startDate, Math.sign(event.deltaY));

    event.preventDefault(); // Stop scroll message from being passed up the DOM tree
  }

  // *************************************************************************
  constructor() {
    this.startDate = startOfWeek(new Date());
  }

  // *************************************************************************
  getDay(dayIndex: number): string {
    var date = addDays(this.startDate, dayIndex);

    return format(date, (date.getDate() == 1) ? 'MMM d' : 'd');
  }

  // *************************************************************************
  getDayClass(dayIndex: number): string {
    var date = addDays(this.startDate, dayIndex);
    if (isToday(date)) {
      return 'current-date';
    }
    else if (date.getMonth() === this.currentMonth) {
      return 'active-month';
    }
    else {
      return '';
    }
  }
}
