import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateoFecha',
  standalone: true
})
export class FormateoFechaPipe implements PipeTransform {
  transform(value: string): string {
    // Asegura que solo se tome la parte de fecha, sin hora
    const fecha = value.split('T')[0]; // '2025-07-18T00:00:00.000Z' → '2025-07-18'
    const [año, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${año}`; // dd/mm/yyyy
  }
}
