import { Injectable } from '@angular/core';
import { IBiblioteca, Ilibros } from '../interface/libros';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private url = 'http://localhost:8080/api/libros';

  cards: Ilibros[] = [];

  constructor(private httpClient: HttpClient) { }

  get libros() {
    /*return this.httpClient.get<Ilibros[]>(`${this.url}/libros`);*/
    return this.httpClient.get<Ilibros[]>(`${this.url}/listaLibros`).pipe(map((res: any) => res.content));
  }

  
  bibliotecas(): Observable<IBiblioteca[]> {
    /*return this.httpClient.get<Ilibros[]>(`${this.url}/libros`);*/
    return this.httpClient.get<IBiblioteca[]>(`${this.url}/bibliotecas`);
  }

  
  DeleteLibros(id: string) {
    return this.httpClient.delete<Ilibros[]>(`${this.url}/${id}`);
  }

  NuevoLibro(emp: Ilibros): any {
    return this.httpClient.post(`${this.url}`,emp);
  }

   //Metodo para editar una mascota
   EditarBiblioteca(emp: Ilibros): any {
    return this.httpClient.put(`${this.url}/editar/${emp.id}` ,emp);
  }
}
