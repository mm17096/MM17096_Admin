import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAnime } from '../../interface/anime';
import { AnimeService } from '../../service/anime.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  [x: string]: any;

  breadCrumbItems: Array<{}>;
  cards: IAnime[] = [];
  offset = 0;
  a!: string | null;

  cardText = new FormControl('');
  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Orders', active: true }];
    this.cards = [];
    //this.buscarCards();
    this.inputReactivo();
  }

  inputReactivo() {
    this.cardText.valueChanges
      .pipe(debounceTime(1500)
      ).subscribe(res => {
        this.cards = [];
        this.buscarCardsForma2(res);
      });
    if (!this.cardText.touched) {
      this.cards = [];
      this.buscarCardsForma2();
    }
  }

  onScroll() {
    console.log('scroll infinito');
    this.offset += 50;
    this.buscarCardsForma2();
  }
  /* 
    onScroll(paraBuscar :string |null) {
      console.log('scroll infinito');
      this.offset += 50;
      console.log(paraBuscar);
      this.animeService.busquedas(this.a, this.offset);
    }
   */
  buscarCards() {
    this.animeService.getCardsAnime(this.offset).subscribe((res) => {
      console.log(res);
      this.cards = [...this.cards, ...res];
    });
  }

  buscarCardsForma2(nombreCard: string | null = null) {
    this.animeService.getCardsAnimeForma2(nombreCard, this.offset).subscribe((res) => {
      console.log(res);
      this.cards = [...this.cards, ...res];
    });
  }

  get resultados() {
    return this.animeService.cards;
  }

  canExit(): boolean {
    if (confirm('Seguro que deseas salir?')) {
      return true;
    } else {
      return false;
    }
  }
}
