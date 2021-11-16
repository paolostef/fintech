import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: Contact[], text?: string): Contact[] {
    if(!text) {
      return array;
    }
    const textLower = text.toLowerCase();
    return array.filter(c => c.name.toLowerCase().startsWith(textLower) || c.surname.toLowerCase().startsWith(textLower));
  }

}
