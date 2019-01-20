import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewImagesRoutingModule } from './view-images-routing.module';
import { ViewImagesComponent } from './view-images/view-images.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ViewImagesComponent],
  imports: [
    CommonModule,
    ViewImagesRoutingModule,
    SharedModule
  ]
})
export class ViewImagesModule { }
