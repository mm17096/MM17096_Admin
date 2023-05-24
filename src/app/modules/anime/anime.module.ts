import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';
import { CardComponent } from './card/card.component';
import { ListarComponent } from './pages/listar/listar.component';
import { AnimeService } from './service/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TablaComponent } from './pages/tabla/tabla.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    CardComponent,
    ListarComponent,
    BuscarComponent,
    TablaComponent,
    MostrarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnimeRoutingModule,
    HttpClientModule,//para las peticiones
    InfiniteScrollModule,//para scroll infinito
    UIModule,//para la modal
    FormsModule,//
    NgbModalModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    AnimeService
  ]
})
export class AnimeModule { }
