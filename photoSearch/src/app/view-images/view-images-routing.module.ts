import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewImagesComponent } from './view-images/view-images.component';

const routes: Routes = [
  {path: '', component: ViewImagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewImagesRoutingModule { }
