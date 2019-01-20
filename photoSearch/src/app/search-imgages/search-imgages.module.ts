import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchImgagesRoutingModule } from './search-imgages-routing.module';
import { SearchUploadImagesComponent } from './search-upload-images/search-upload-images.component';

@NgModule({
  declarations: [SearchUploadImagesComponent],
  imports: [
    CommonModule,
    SearchImgagesRoutingModule
  ]
})
export class SearchImgagesModule { }
