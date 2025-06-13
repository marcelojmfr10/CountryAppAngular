import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); // {}

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        return throwError(() => new Error(`No se pudo obtener países con ese query ${query}`));
      })
      // hay que especificar los parámetros porque sino se manda como referencia la función y choca con el this en la clase
    );
  }

  //restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)

  searchByCountry(query: string) {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      delay(2000),
      catchError(error => {
        return throwError(() => new Error(`No se pudo obtener países con ese query ${query}`));
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      map(countries => countries.at(0)),
      catchError(error => {
        return throwError(() => new Error(`No se pudo encontrar un país con ese código ${code}`));
      })
    );
  }



}
