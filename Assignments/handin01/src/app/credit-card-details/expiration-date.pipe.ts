import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'expirationDate'
})
export class ExpirationDatePipe implements PipeTransform {
    transform(month: number, year: number): string {
        return `${month}/${year}`;
    }
}  
