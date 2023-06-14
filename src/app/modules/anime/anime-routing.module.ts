import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/listar/listar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {path:'listar', component: ListarComponent},
  {path:'mostrar', component: MostrarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimeRoutingModule { }
