import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoService } from './service/empleado.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';


@NgModule({
  declarations: [
    BuscarComponent,
    TablaComponent,
    MostrarComponent,
    NuevoComponent,
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,//para las peticiones
    InfiniteScrollModule,//para scroll infinito
    UIModule,//para la modal
    FormsModule,//
    NgbModalModule,
    NgxPaginationModule,//PARA LA PAGINACION
    Ng2SearchPipeModule,//PIPE PARA FILTRAR
  ], 
  providers: [
    EmpleadoService
  ]
})
export class EmpleadoModule { }
