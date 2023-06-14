import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBiblioteca } from '../interface/biblioteca';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { Biblioteca } from '../model/biblioteca.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private url = 'http://localhost:8080/api/biblioteca';
// http://localhost:8080/api/biblioteca?page=0&size=5&order=id,asc
  cards: IBiblioteca[] = [];

  constructor(private httpClient: HttpClient) { }


  public biblioteca(page: number, size: number):Observable<any>{
    return this.httpClient.get<any>(this.url+'?'+`page=${page}&size=${size}`);
    /* return this.httpClient.get<IBiblioteca[]>(`${this.url}/biblioteca`); */
  }

  
  public bibliotecabyId(biblioteca: Biblioteca):Observable<any>{
    return this.httpClient.get<any>(this.url+'/'+`${biblioteca.id}`);
    /* return this.httpClient.get<IBiblioteca[]>(`${this.url}/biblioteca`); */
  }

/*   get biblioteca(){
    return this.httpClient.get<IBiblioteca[]>(`${this.url}`).pipe(map((res: any) => res.content));
    /* return this.httpClient.get<IBiblioteca[]>(`${this.url}/biblioteca`);
  } */
  
  DeleteBiblioteca(id: string) {
    return this.httpClient.delete<IBiblioteca[]>(`${this.url}/eliminar/${id}`);
  }

  NuevoBiblioteca(emp: IBiblioteca): any {
    return this.httpClient.post(`${this.url}/agregar`,emp);
  }

   //Metodo para editar una mascota
   EditarBiblioteca(emp: IBiblioteca): any {
    return this.httpClient.put(`${this.url}/editar/${emp.id}` ,emp);
  }
}
