import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop'
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''; //snapshot no es reactivo

  query = linkedSignal(() => this.queryParam);

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err)
  //       },

  //     });
  // }

  // con promesas
  // query = signal('');
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if (!request.query) return [];

  //     // return this.countryService.searchByCapital(request.query);
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   }
  // })

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if (!request.query) return of([]); // el of regresa un observable de lo que indiquemos

      // actualizar el url
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,
        }
      })

      return this.countryService.searchByCapital(request.query)
    }
  })
}

// this.isLoading.set(false);
// this.countries.set(countries);
// const c = CountryMapper.mapRestCountryArrayToCountryArray(countries);
