import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private activeModalId = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=100`).pipe(
      map((response: any) => response.results),
      switchMap((pokemons: any[]) =>
        forkJoin(pokemons.map((pokemon) => this.http.get(pokemon.url)))
      ),
      map((pokemonDetails: any[]) => {
        return pokemonDetails.map((detail) => this.convertToPokemon(detail));
      })
    );
  }

  getPokemonDetails(pokemonId: number): Observable<any> {
    this.activeModalId.next(pokemonId);
    return this.http
      .get(`${this.apiUrl}/${pokemonId}`)
      .pipe(map((pokeDetail) => this.convertToPokemon(pokeDetail)));
  }

  private convertToPokemon(pokeDetail: any): any {
    const typesArray = pokeDetail.types.map((t: any) => t.type.name);
    const primaryType = typesArray[0];
    const secondaryType = typesArray[1];

    const abilities = pokeDetail.abilities.map(
      (abilitySlot: any) => abilitySlot.ability.name
    );
    const stats = pokeDetail.stats.map((statSlot: any) => ({
      statName: statSlot.stat.name,
      baseStat: statSlot.base_stat,
    }));

    return {
      number: pokeDetail.id,
      name: pokeDetail.name,
      types: typesArray,
      primaryType: primaryType,
      secondaryType: secondaryType,
      photo: pokeDetail.sprites.other.dream_world.front_default,
      abilities: abilities,
      stats: stats,
    };
  }

  closeModal(): void {
    this.activeModalId.next(null);
  }

  getActiveModalId(): Observable<number | null> {
    return this.activeModalId.asObservable();
  }
}
