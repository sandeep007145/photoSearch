import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchUploadImagesComponent } from './search-upload-images/search-upload-images.component';

const routes: Routes = [
  {path: '', component: SearchUploadImagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchImgagesRoutingModule { }
