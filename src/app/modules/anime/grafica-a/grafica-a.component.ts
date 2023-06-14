import { Component, OnInit, Input } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica-a',
  templateUrl: './grafica-a.component.html',
  styleUrls: ['./grafica-a.component.scss']
})
export class GraficaAComponent implements OnInit {

  @Input() title: string = "sin titulo";
  @Input('labels') donaLabels: Label[]=['Label1', 'Label2'];
  @Input('data') donaData: MultiDataSet = [[300, 4150]];
  @Input('colors') colors: Color[] = [{backgroundColor: ['#6857E6','#2354E6']}];

  constructor() { }

  ngOnInit(): void {
  }

}
