import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';
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
    LibrosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,//para las peticiones
    InfiniteScrollModule,//para scroll infinito
    UIModule,//para la modal
    FormsModule,//
    NgbModalModule,
    NgxPaginationModule,//PARA LA PAGINACION
    Ng2SearchPipeModule,//PIPE PARA FILTRAR
  ]
})
export class LibrosModule { }
