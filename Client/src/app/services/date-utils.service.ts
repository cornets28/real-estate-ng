// date-utils.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes it a singleton service
})
export class DateUtilsService {
  parseDate(dateString: string): Date | null {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }
}
