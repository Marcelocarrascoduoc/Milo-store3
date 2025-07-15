import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
  name: 'formateoFecha'
})
@Injectable({
  providedIn: 'root'
})
export class FormateoFechaPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // ...tu lógica de formateo...
    return value;
  }
}