import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.css'],
})
export class PokedexListComponent implements OnInit {
  pokemons: any[] = []; // Substitua 'any' pelo modelo de dados do Pokémon, se houver

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data) => {
      // Filtra a lista para garantir que todos os Pokémon sejam válidos
      this.pokemons = data.filter((pokemon: any) => pokemon && pokemon.number);
      this.cdr.detectChanges(); // Detecta mudanças para atualizar a visualização
    });
  }
}
