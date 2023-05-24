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

  label: string[] = [];
  dataGrafica = [];
  color = [{ backgraundColor: []}];

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Anime' }, { label: 'Mostrar', active: true }];//Migas de pan
    this.getCards();
  }

  getCards(nombreCard: string | null = null) {
    this.animeService.getCardsAnimeForma2(nombreCard, this.offset).subscribe((res) => {
      console.log(res);
      this.cards = [...this.cards, ...res];//guarda lo que tiene card mas lo que trae la respuesta
      this.graficar();
    })
 
  }

  graficar(){
    let grupos = {};
    //agrupar por tippo
    this.cards.forEach(card => {
      const llave = card.type;
      if (!grupos[llave]){
        grupos[llave] = [];
      }
        grupos[llave].push(card);
    });
    console.log(grupos);

    let keyColor = 'backgroundColor';
    for (const key in grupos) {
      this.label.push(key);
      this.dataGrafica.push(grupos[key].length);
      this.color[0][keyColor].push(this.colorHex());
    }

    console.log(this.dataGrafica);
    console.log(this.label);
    console.log(this.color);
  }

  generarLetra(){
    let letra=["a", "b", "c", "d", "e", "f", "0","1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let numero = (Math.random()*15).toFixed(0);
    return letra[numero];
  }

  colorHex(){
    let color = "";
    for (let i = 0; i < 6 ;i++){
     color = color + this.generarLetra();
    }
    return "#" + color;
  }

}