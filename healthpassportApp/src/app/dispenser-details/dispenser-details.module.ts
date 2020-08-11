import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispenserDetailsPageRoutingModule } from './dispenser-details-routing.module';

import { DispenserDetailsPage } from './dispenser-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispenserDetailsPageRoutingModule
  ],
  declarations: [DispenserDetailsPage]
})
export class DispenserDetailsPageModule {}
