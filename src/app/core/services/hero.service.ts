import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';
import { Observable, of, tap } from 'rxjs';
import { HeroHome } from '@interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private API_V2 = `${ENV.webApi}/v2/hero`;
  private cache: HeroHome[] = [];

  constructor(private http: HttpClient) {}

  getListHomeHero(): Observable<HeroHome[]> {
    return this.cache.length > 0
      ? of(this.cache)
      : this.http
          .get<HeroHome[]>(`${this.API_V2}//list`)
          .pipe(tap((response: HeroHome[]) => (this.cache = response)));
  }

  clearCache(): void {
    this.cache = [];
  }
}
