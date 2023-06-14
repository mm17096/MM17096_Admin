import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LibrosService } from '../../service/libros.service';
import { Ilibros } from '../../interface/libros';
import { IBiblioteca } from '../../interface/libros';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {


  listBlioteca: IBiblioteca[] = [];
  @Input() libroOd!: Ilibros;
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() queryString: string;

  formBuilder!: FormGroup;
  p: any;
  card: Ilibros;
  idempleado: string = '';
  constructor(private librosService: LibrosService, private modalService: NgbModal, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formBuilder = this.Iniciarformulario();
    this.llenarcombo();
  }

  private llenarcombo(){
    this.librosService.bibliotecas().subscribe({
      next: (resp) => {
        this.listBlioteca = resp;
      }
    })
  }

  private Iniciarformulario(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      biblioteca: ['', [Validators.required]],
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  guardar() {
    if (this.formBuilder.valid) {
      if (this.libroOd != null) {
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
    const libro: any = {
      nombre: this.formBuilder.get("nombre").value,
      biblioteca: {
        id: this.formBuilder.get("biblioteca").value
      }
    };
    this.librosService.NuevoLibro(libro).subscribe((resp: any) => {
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
    this.libroOd.nombre = this.formBuilder.controls['nombre'].value;
    this.libroOd.biblioteca = this.formBuilder.controls['biblioteca'].value;
    
    this.librosService.EditarBiblioteca(this.libroOd).subscribe((resp: any) => {
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
