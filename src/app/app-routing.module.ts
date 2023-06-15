import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/errors/not-found/not-found.component';
import { NotAllowedComponent } from './core/components/errors/not-allowed/not-allowed.component';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: '',
    redirectTo: '/profile/explorer',
    pathMatch: 'full'
  },
  { 
    path: 'errors/404',
    component: NotFoundComponent
  },
  { 
    path: 'errors/not-allowed',
    component: NotAllowedComponent
  },
  { 
    path: '**',
    redirectTo: 'errors/404'
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
