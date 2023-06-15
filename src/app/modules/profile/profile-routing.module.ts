import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ExplorerComponent } from "./explorer/explorer.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'explorer',
    pathMatch: 'full'
  },
  {
    path: 'explorer',
    component: ExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {
}
