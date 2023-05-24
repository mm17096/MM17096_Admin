import { Component, OnInit, Input } from '@angular/core';
import { IEmpleado } from '../../interface/empleado';
import { EmpleadoService } from '../../service/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  @Input() empleadoOd!: IEmpleado;
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() queryString: string;

  formBuilder!: FormGroup;
  p: any;
  card: IEmpleado;
  idempleado: string = '';
  constructor(private empleadoService: EmpleadoService, private modalService: NgbModal, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formBuilder = this.Iniciarformulario();
  }

  private Iniciarformulario(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
      puntaje: ['', [Validators.required]]
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  guardar() {
    if (this.formBuilder.valid) {
      if (this.empleadoOd != null) {
        this.editando();
      } else {
        this.registrando();
      }
    } else {
      Swal.fire({
        position: 'center',
        title: 'Faltan datos en el formuario',
        text: 'submit disparado, formulario no valido' + this.formBuilder.valid,
        icon: 'warning',
      });
    }
  }

  registrando() {
    const empleado = this.formBuilder.value;
    this.empleadoService.NuevoEmpleado(empleado).subscribe((resp: any) => {
      if (resp) {
        /* console.log(resp); */
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      /* console.log(err); */
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }

  editando() {

    //const mascota = this.formMascota.value;
    this.empleadoOd.nombre = this.formBuilder.controls['nombre'].value;
    this.empleadoOd.apellido = this.formBuilder.controls['apellido'].value;
    this.empleadoOd.email = this.formBuilder.controls['email'].value;
    this.empleadoOd.puntaje = this.formBuilder.controls['puntaje'].value;
    
    this.empleadoService.EditarEmpleado(this.empleadoOd).subscribe((resp: any) => {
      if (resp) {
        //console.log(resp);
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      //console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
