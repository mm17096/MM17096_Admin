import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarBibliotecasComponent } from './pages/listar-bibliotecas/listar-bibliotecas.component';

const routes: Routes = [
  {path:'mostrar', component: ListarBibliotecasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecaRoutingModule { }
