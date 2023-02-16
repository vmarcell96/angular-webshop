import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

@NgModule({
  declarations: [
    StarComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    ConvertToSpacesPipe,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
