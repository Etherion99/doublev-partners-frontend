import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './explorer/explorer.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GithubService } from 'src/app/shared/services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ViewerComponent } from './viewer/viewer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    ExplorerComponent,
    ViewerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    HttpClientModule,
    CardModule,
    NgxChartsModule,
    ImageModule
  ],
  providers: [
    GithubService
  ]
})
export class ProfileModule { }
