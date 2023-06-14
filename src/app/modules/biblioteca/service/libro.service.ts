import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBiblioteca } from '../interface/biblioteca';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { Biblioteca } from '../model/biblioteca.model';
import { Libro } from '../model/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private url = 'http://localhost:8080/api/libros';

  constructor(private httpClient: HttpClient) { }

  agregarLibro(librito: Libro){
    const url = `${this.url}`;
    return this.httpClient.post(url, librito);
    /* return this.httpClient.get<IBiblioteca[]>(`${this.url}/biblioteca`); */
  }

  editarLibro(librito: Libro){
    const url = `${this.url}/${librito.id}`;
    return this.httpClient.put(url, librito);
    /* return this.httpClient.get<IBiblioteca[]>(`${this.url}/biblioteca`); */
  }

  borrarLibro(librito: Libro){
    const url = `${this.url}/${librito.id}`;
    return this.httpClient.delete(url);
    /* return this.httpClient.get<IBiblioteca[]>(`${this.url}/biblioteca`); */
  }

}
