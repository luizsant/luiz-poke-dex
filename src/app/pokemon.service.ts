import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=100`).pipe(
      map((response: any) => response.results),
      switchMap((pokemons: any[]) =>
        forkJoin(pokemons.map((pokemon) => this.http.get(pokemon.url)))
      ),
      map((pokemonDetails: any[]) => {
        const pokemons = pokemonDetails.map((detail) =>
          this.convertToPokemon(detail)
        );
        return pokemons;
      })
    );
  }
  getPokemonDetails(pokemonId: number): Observable<any> {
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
      abilities: abilities, // Adicionando habilidades
      stats: stats, // Adicionando status
    };
  }
}
