// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  exports: [PaginationComponent,
  FormsModule,
  ReactiveFormsModule
  ],
})
export class SharedModule { }
