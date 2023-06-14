import { Component, OnInit } from '@angular/core';
import { IAnime } from '../../interface/anime';
import { AnimeService } from '../../service/anime.service';
import { ChartOptions } from '../../grafica-b/chartType.interface';

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

  labels: string[] = [];
  dataGrafica = [];
  colores = [{ backgroundColor: [] }];
  dataApex: Partial<ChartOptions> = {
    series: [
      {
        name: 'Series',
        data: []
      }
    ],
    chart: {
      height: '350',
      type: 'bar'
    },
    title: {
      text: ""
    },
    xaxis: {
      categories: []
    }
  };

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

    let keySeries = 'series';
    let data = 'data';
    let xaxis = 'xaxis';
    let categories = 'categories';

    for (const key in grupos) {
      this.labels.push(key);
      this.dataGrafica.push(grupos[key].length);
      this.colores[0][keyColor].push(this.colorHex());

      this.dataApex[keySeries][0][data].push(grupos[key].length);
      this.dataApex[xaxis][categories].push(key);
    }

    this.dataApex.title.text = "Grafica de Anime Barras";
    console.log("este",this.dataApex);

    console.log(this.dataGrafica);
    console.log(this.labels);
    console.log(this.colores);
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
    return "#"+color;
  }

}