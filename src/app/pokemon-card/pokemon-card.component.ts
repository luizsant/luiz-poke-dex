import {
  Component,
  Input,
  OnInit,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  @Input() pokemon: any;
  showDetails: boolean = false;
  detailedPokemon: any;
  private modalSubscription?: Subscription; // Fazendo modalSubscription opcional

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.modalSubscription = this.pokemonService
      .getActiveModalId()
      .subscribe((activeModalId) => {
        this.showDetails = activeModalId === this.pokemon.number;
      });
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      // Verificando se modalSubscription está definido
      this.modalSubscription.unsubscribe();
    }
  }

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
    this.pokemonService.getPokemonDetails(this.pokemon.number).subscribe(
      (data) => {
        this.detailedPokemon = data;
        this.showDetails = true;
      },
      (error) => {
        console.error('Erro ao carregar detalhes do Pokémon:', error);
      }
    );
  }

  closeDetails() {
    this.pokemonService.closeModal();
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDetails();
    }
  }
}
