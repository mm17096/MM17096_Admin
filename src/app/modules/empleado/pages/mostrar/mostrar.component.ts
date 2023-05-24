import { Component, OnInit, Input } from '@angular/core';
import { IEmpleado } from '../../interface/empleado';
import { EmpleadoService } from '../../service/empleado.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {


  empleados: IEmpleado[] = [];//para almacenar el resultado
  offset = 0; //limite del rango de la consulta de la API
  breadCrumbItems: Array<{}>;
  term: string = '';
  proceso: string = 'Nuevo Empleado';

  @Input() empleado!: IEmpleado;

  ///

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Empleado' }, { label: 'Mostrar', active: true }];//Migas de pan
   
    this.empleadoService.empleado.subscribe((resp: IEmpleado[]) => {
      this.empleados = resp;
      console.log(resp);
    });

  }

}
 