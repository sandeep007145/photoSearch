import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewImagesRoutingModule } from './view-images-routing.module';
import { ViewImagesComponent } from './view-images/view-images.component';

@NgModule({
  declarations: [ViewImagesComponent],
  imports: [
    CommonModule,
    ViewImagesRoutingModule
  ]
})
export class ViewImagesModule { }
