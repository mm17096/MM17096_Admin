import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmpleado } from '../interface/empleado';

@Injectable({
  providedIn: 'root'
})


export class EmpleadoService {
  private url = 'http://localhost:8080/empleado';

  cards: IEmpleado[] = [];

  constructor(private httpClient: HttpClient) { }

  get empleado() {
    return this.httpClient.get<IEmpleado[]>(`${this.url}/listar`);
  }

  
  DeleteEmpleado(id: string) {
    return this.httpClient.delete<IEmpleado[]>(`${this.url}/eliminar/${id}`);
  }

  NuevoEmpleado(emp: IEmpleado): any {
    return this.httpClient.post(`${this.url}/agregar`,emp);
  }

   //Metodo para editar una mascota
   EditarEmpleado(emp: IEmpleado): any {
    return this.httpClient.put(`${this.url}/editar/${emp.id}` ,emp);
  }
}
