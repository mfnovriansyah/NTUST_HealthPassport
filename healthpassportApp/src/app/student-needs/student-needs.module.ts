import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentNeedsPageRoutingModule } from './student-needs-routing.module';

import { StudentNeedsPage } from './student-needs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentNeedsPageRoutingModule
  ],
  declarations: [StudentNeedsPage]
})
export class StudentNeedsPageModule {}
