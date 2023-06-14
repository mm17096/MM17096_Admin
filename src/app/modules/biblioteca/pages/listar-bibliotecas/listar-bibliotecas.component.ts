import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../service/biblioteca.service';
import { Biblioteca } from '../../model/biblioteca.model';
import { Libro } from '../../model/libro.model';
import Swal from 'sweetalert2';
import { LibroService } from '../../service/libro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NAME_VALIDATE } from '../../contants/constants';


@Component({
  selector: 'app-listar-bibliotecas',
  templateUrl: './listar-bibliotecas.component.html',
  styleUrls: ['./listar-bibliotecas.component.scss']
})
export class ListarBibliotecasComponent implements OnInit {

  private isLetras: string = NAME_VALIDATE;
  cambiarBiblioteca: Biblioteca = null; //para cambiar libros a otra biclioteca
  checked: boolean = false;

  //para la paginación
  bibliotecas: Array<any>;
  breadCrumbItems: Array<{}>;
  libros: Array<any>[] = [];

  constructor(private bibliotecaService: BibliotecaService, private libroService: LibroService, private modalService: NgbModal, private fb: FormBuilder) { }
  /* para la paginacion algunas variables */
  page: number = 0;
  size: number = 10;
  totalElement: number = 0;
  isFirt: boolean = false;
  isLast: boolean = false;
  totalPages: Array<number> = [];

  /* para la tabla, los libros */
  hideme: boolean[] = [];


  /* Para agregar libro */
  formLibro!: FormGroup;
  submitted: boolean = false;
  bibliotecaSeleccionada: Biblioteca = null;
  libroSeleccionado: Libro = null;
  ix: number;


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Biblioteca' }, { label: 'Listar', active: true }];//Migas de pan
    this.mostrarBibliotecas();
    this.initForm();
  }

  initForm() {
    this.formLibro = this.fb.group({
      nombre: ["", [Validators.required, Validators.pattern(this.isLetras)]],
    });
  }


  mostrarBibliotecas() {
    this.bibliotecaService.biblioteca(this.page, this.size).subscribe({
      next: (response) => {
        console.log(response.content);
        this.bibliotecas = response.content;
        this.bibliotecas.forEach((x) => {
          this.hideme.push(true);
        });
      },
    });
  }



  changeValue(i: any) {
    this.hideme[i] = !this.hideme[i];
  }

  llenarHideme() {
    this.bibliotecas.forEach((x) => {
      this.hideme.push(true);
    });
  }

  mostrarLibros(biblio: Biblioteca, i: number) {
    this.mostrarBibliotecas();
    this.changeValue(i);
    this.libros[i] = [];
    this.bibliotecaService.bibliotecabyId(biblio).subscribe({
      next: (response) => {
        this.libros[i] = response.libros;
        console.log("libros: ", this.libros);
      },
    });
  }

  cambiarAotraBiblioteca(biblioteca: Biblioteca) {
    this.cambiarBiblioteca = biblioteca;
  }

  EliminarLibro(librito: Libro, biblio: Biblioteca, i: number) {
    Swal.fire({
      title: "Eliminacion",
      text: "¿Desea eliminar el libro?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#AF1717',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })
      .then(resultado => {
        if (resultado.value) {
          this.libroService.borrarLibro(librito).subscribe(resp => {
            console.log(resp);
            if (!resp) {
              this.changeValue(i);
            } else {

            }
          });
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
          this.mostrarLibros(biblio, i);
        }
      });
  }

  setSize(size: number) {
    this.size = size;
    this.mostrarBibliotecas();
  }

  GuardarLibro() {
    console.log('entra');
    if (this.formLibro.valid) {
      if (this.libroSeleccionado == null) {
        console.log('entra2');
        this.RegistrarLibro();
      } else {
        this.EditarLibro();
      }
    }
    this.modalService.dismissAll();
    this.submitted = true;
  }

  RegistrarLibro() {
    const nombre = this.formLibro.get('nombre').value;
    const librito: Libro = new Libro(nombre, this.bibliotecaSeleccionada);
    console.log("librito", librito);
    /* Aqui Guardar */
    this.libroService.agregarLibro(librito).subscribe(resp => {
      if (resp) {
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.changeValue(this.ix);
      }
    }, (err: any) => {
      Swal.fire({
        title: 'Error',
        text: 'Error al guardar, hable con el administrador',
        icon: 'error',
      });
    });
  }

  EditarLibro() {
    const nombre = this.formLibro.get('nombre').value;
    this.libroSeleccionado.nombre = nombre;
    this.libroSeleccionado.biblioteca = this.bibliotecaSeleccionada;
    console.log("librito", this.libroSeleccionado);
    /* Aqui Modifica */
    this.libroService.editarLibro(this.libroSeleccionado).subscribe(resp => {
      if (resp) {
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos modificados con exito',
          icon: 'info',
        });
        this.changeValue(this.ix);
      }
    }, (err: any) => {
      Swal.fire({
        title: 'Error',
        text: 'Error al editar, hable con el administrador',
        icon: 'error',
      });
    });
  }

  AgregarLibroModal(content: any, biblio: Biblioteca, i: number) {
    this.initForm();
    this.submitted = false;
    this.bibliotecaSeleccionada = biblio;
    this.libroSeleccionado = null;
    this.ix = i;
    this.modalService.open(content);
  }

  EditarLibroModal(content: any, biblio: Biblioteca, libro: Libro, i: number) {
    this.formLibro.patchValue(libro);
    this.bibliotecaSeleccionada = biblio;
    this.libroSeleccionado = libro;
    this.submitted = false;
    this.ix = i;
    this.modalService.open(content);
  }



  setPage(page: number): void {
    this.page = page;
    this.mostrarBibliotecas();
  }

  retroceder() {
    if (!this.isFirt) {
      this.page--;
      this.mostrarBibliotecas();
    }
  }

  adelante() {
    if (!this.isLast) {
      this.page++;
      this.mostrarBibliotecas();
    }
  }


  trasladarBiblioteca(biblioteca: Biblioteca, id: number) {
    let librosACambiar: Libro[] = [];
    for (let x of biblioteca["libros"]) {
      let element = <HTMLInputElement>(
        document.getElementById(x["id"].toString())
      );
      if (element.checked) {
        let obj: Libro = new Libro(
          x.nombre,
          this.cambiarBiblioteca,
          x.id
        );
        librosACambiar.push(obj);
        this.libroService.editarLibro(obj).subscribe({
          next: (resp) => {
            Swal.fire({
              position: "center",
              title: "Buen Trabajo!",
              icon: "success",
              text: "Datos Modificados con Éxito!",
            });
          },
          error: () => {
            Swal.fire({
              position: "center",
              title: "Error",
              icon: "error",
              text: "Error al modificar hable con el Administrador",
            });
          },
        });
      }
    }
    this.changeValue(this.ix);
    this.llenarHideme();
    this.mostrarBibliotecas();
    this.mostrarLibros(biblioteca, id);
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formLibro.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
        ? "is-valid"
        : "";
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////listar-bibliotecas.component.html


}

