import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query)
      .subscribe((countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);

        // const c = CountryMapper.mapRestCountryArrayToCountryArray(countries);
      });
  }

}
