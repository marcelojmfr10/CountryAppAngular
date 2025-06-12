import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent { }
