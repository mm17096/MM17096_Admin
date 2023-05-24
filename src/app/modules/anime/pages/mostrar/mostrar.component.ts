import { Component, OnInit } from '@angular/core';
import { IAnime } from '../../interface/anime';
import { AnimeService } from '../../service/anime.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {

  cards: IAnime[] = [];//para almacenar el resultado
  offset = 0; //limite del rango de la consulta de la API
  breadCrumbItems: Array<{}>;
  term: string = '';

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Anime' }, { label: 'Mostrar', active: true }];//Migas de pan
    this.getCards();
  }

  getCards(nombreCard: string | null = null){
    this.animeService.getCardsAnimeForma2(nombreCard, this.offset).subscribe((res) => {
      console.log(res);
      this.cards = [...this.cards, ...res];//guarda lo que tiene card mas lo que trae la respuesta
    })
  }

}