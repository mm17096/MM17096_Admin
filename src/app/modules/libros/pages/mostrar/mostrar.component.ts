import { Component, OnInit, Input } from '@angular/core';
import { LibrosService } from '../../service/libros.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Ilibros } from '../../interface/libros';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {


  libros: Ilibros[];//para almacenar el resultado
  offset = 0; //limite del rango de la consulta de la API
  breadCrumbItems: Array<{}>;
  term: string = '';
  proceso: string = 'Nuevo Libro';

  @Input() empleado!: Ilibros;

  ///

  constructor(private librosservice: LibrosService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Empleado' }, { label: 'Mostrar', active: true }];//Migas de pan

    this.librosservice.libros.subscribe((resp: Ilibros[]) => {
      this.libros = resp;
      console.log(this.libros);
    });

  }

}
