import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: any; // Substitua 'any' pelo modelo de dados do Pokémon, se houver
  showDetails: boolean = false; // Para controlar a visibilidade do banner de detalhes
  detailedPokemon: any; // Armazena os detalhes do Pokémon

  constructor(private pokemonService: PokemonService) {} // Injeção do serviço

  ngOnInit(): void {}

  getBackgroundColor(primaryType: string): string {
    switch (primaryType) {
      case 'grass':
        return '#78c850';
      case 'fire':
        return '#f08030';
      case 'water':
        return '#6890f0';
      case 'electric':
        return '#f8d030';
      case 'ground':
        return '#e0c068';
      case 'normal':
        return '#a8a878';
      case 'poison':
        return '#a040a0';
      case 'bug':
        return '#a8b820';
      case 'psychic':
        return '#f85888';
      case 'ghost':
        return '#705898';
      case 'rock':
        return '#b8a038';
      case 'fairy':
        return '#ee99ac';
      case 'fighting':
        return '#c03028';
      default:
        return '#ccc';
    }
  }
  loadPokemonDetails() {
    console.log('ID do Pokémon:', this.pokemon.number);
    this.pokemonService.getPokemonDetails(this.pokemon.number).subscribe(
      (data) => {
        console.log('Detalhes do Pokémon:', data);
        this.detailedPokemon = data;
        this.showDetails = true;
      },
      (error) => {
        console.error('Erro ao carregar detalhes do Pokémon:', error);
      }
    );
  }

  closeDetails() {
    this.showDetails = false;
  }
}
