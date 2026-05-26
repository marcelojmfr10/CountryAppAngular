import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countrycode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({
      code: this.countrycode,
    }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    },
  });
}
