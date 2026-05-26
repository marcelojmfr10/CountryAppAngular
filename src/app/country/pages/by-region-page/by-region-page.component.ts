import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''; //snapshot no es reactivo

  selectedRegion = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParam),
  );

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]); // el of regresa un observable de lo que indiquemos

      // actualizar el url
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region,
        },
      });

      return this.countryService.searchByRegion(request.region);
    },
  });
}
