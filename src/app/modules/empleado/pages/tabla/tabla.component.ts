import { Component, Input, OnInit } from '@angular/core';
import { IEmpleado } from '../../interface/empleado';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() empleadoOd!: IEmpleado[];
  @Input() queryString: string;
  p: any;
  card: IEmpleado;
  idempleado: string = '';
  empleado: IEmpleado[] = []; //array de mascotas
  constructor(private modalService: NgbModal, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
  }

  Eliminar(iempleado: string) {
    Swal.fire({
      title: "Eliminacion",
      text: "¿Desea eliminar el empleado?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#AF1717',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })
      .then(resultado => {
        if (resultado.value) {
          this.idempleado = iempleado;
          this.empleadoService.DeleteEmpleado(iempleado)
            .subscribe(resp => this.empleadoService.empleado.subscribe(
              respn => this.empleado = respn
            )
            );
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Se elimino el empleado',
          });
          this.obtenerEmpleados();
        }
      });

  }

  private obtenerEmpleados() {
    this.empleadoService.empleado.subscribe((resp: IEmpleado[]) => {
      this.empleadoOd = resp;
      console.log(resp);
    });
  }
}
