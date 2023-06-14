import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListarBibliotecasComponent } from './pages/listar-bibliotecas/listar-bibliotecas.component';


@NgModule({
  declarations: [
    ListarBibliotecasComponent,
  ],
  imports: [
    CommonModule,
    BibliotecaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,//para las peticiones
    InfiniteScrollModule,//para scroll infinito
    UIModule,//para las "migas de pan"
    FormsModule,// para el NgModel
    NgbModalModule,// para la modal
    NgxPaginationModule,//PARA LA PAGINACION
    Ng2SearchPipeModule,//PIPE PARA FILTRAR
    NgbModule,
  ]
})
export class BibliotecaModule { }
