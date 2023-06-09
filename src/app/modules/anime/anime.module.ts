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
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficaAComponent } from './grafica-a/grafica-a.component';
import { GraficaBComponent } from './grafica-b/grafica-b.component';
import { ChartsModule } from 'ng2-charts';
import { ApexComponent } from 'src/app/pages/chart/apex/apex.component';
import * as ApexCharts from 'apexcharts';
//import { AdminGuard } from 'src/app/core/guards/auth.guard';


@NgModule({
  declarations: [
    CardComponent,
    ListarComponent,
    BuscarComponent,
    TablaComponent,
    MostrarComponent,
    GraficaAComponent,
    GraficaBComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnimeRoutingModule,
    HttpClientModule,//para las peticiones
    InfiniteScrollModule,//para scroll infinito
    UIModule,//para la modal
    FormsModule,//
    NgbModalModule, //para el modal
    NgxPaginationModule, //para paginar
    Ng2SearchPipeModule, //para buscar datos en la tabla
    NgApexchartsModule, //para graficas
    ChartsModule, //para graficas
  ],
  providers: [
   // AdminGuard,
    AnimeService
  ]
})
export class AnimeModule { }
