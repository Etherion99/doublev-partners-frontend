import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/errors/not-found/not-found.component';

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
    path: '404',
    component: NotFoundComponent
  },
  { 
    path: '**',
    redirectTo: '404'
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
