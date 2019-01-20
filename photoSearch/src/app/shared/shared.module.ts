// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],

  exports: [PaginationComponent,
  FormsModule,
  ReactiveFormsModule
  ],
})
export class SharedModule { }
