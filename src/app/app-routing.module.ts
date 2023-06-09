import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  /* { path: 'anime', loadChildren: () => import('./modules/anime/anime.module').then(m => m.AnimeModule) }, */
  // tslint:disable-next-line: max-line-length
  { path: 'anime', component: LayoutComponent, loadChildren: () => import('./modules/anime/anime.module').then(m => m.AnimeModule), canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: 'empleado', component: LayoutComponent, loadChildren: () => import('./modules/empleado/empleado.module').then(m => m.EmpleadoModule), canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: 'libros', component: LayoutComponent, loadChildren: () => import('./modules/libros/libros.module').then(m => m.LibrosModule), canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: 'biblioteca', component: LayoutComponent, loadChildren: () => import('./modules/biblioteca/biblioteca.module').then(m => m.BibliotecaModule), canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'crypto-ico-landing', component: CyptolandingComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: '**', component: Page404Component },

 /*  canActivate: [AuthGuard]
canActivate: [AuthGuard]
canActivate: [AuthGuard]
canActivate: [AuthGuard]
canActivate: [AuthGuard]
canActivate: [AuthGuard] */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
