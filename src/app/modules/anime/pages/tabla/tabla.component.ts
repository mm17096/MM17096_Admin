import { Component, Input, OnInit } from '@angular/core';
import { IAnime } from '../../interface/anime';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() cards!: IAnime[];
  @Input() queryString: string;
  p:any;
  card: IAnime;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(content: any, card:IAnime) {
    this.card = card;
    this.modalService.open(content, { centered: true });
  }

}
