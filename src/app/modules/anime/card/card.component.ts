import { Component, Input, OnInit } from '@angular/core';
import { IAnime } from '../interface/anime';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() card!:IAnime;
  constructor() { }


}
