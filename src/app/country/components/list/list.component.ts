import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  countries = input.required<Country[]>();

 }
