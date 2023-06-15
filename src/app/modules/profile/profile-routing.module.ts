import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ExplorerComponent } from "./explorer/explorer.component";
import { ViewerComponent } from './viewer/viewer.component';
import { ScoreGuard } from 'src/app/core/guards/score-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'explorer',
    pathMatch: 'full'
  },
  {
    path: 'explorer',
    component: ExplorerComponent
  },
  {
    path: 'viewer/:login',
    component: ViewerComponent,
    canActivate: [ScoreGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {
}
