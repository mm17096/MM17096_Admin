import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Ilibros } from '../../interface/libros';
import { LibrosService } from '../../service/libros.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() libroOd!: Ilibros[];
  @Input() queryString: string;
  p: any;
  card: Ilibros;
  idempleado: string = '';
  empleado: Ilibros[] = []; //array de mascotas
  constructor(private modalService: NgbModal, private librosService: LibrosService) { }

  ngOnInit(): void {

  }

  Eliminar(ilibro: string) {
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
          this.idempleado = ilibro;
          this.librosService.DeleteLibros(ilibro)
            .subscribe(resp => this.librosService.libros.subscribe(
              respn => this.empleado = respn['content']
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
            title: 'Se elimino el libro',
          });
          this.obtenerEmpleados();
        }
      });

  }

  private obtenerEmpleados() {
    this.librosService.libros.subscribe((resp: Ilibros[]) => {
      this.libroOd = resp;
      console.log(resp);
    });
  }
}
