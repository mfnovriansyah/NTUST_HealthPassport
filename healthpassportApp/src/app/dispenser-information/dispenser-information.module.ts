import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispenserInformationPageRoutingModule } from './dispenser-information-routing.module';

import { DispenserInformationPage } from './dispenser-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispenserInformationPageRoutingModule
  ],
  declarations: [DispenserInformationPage]
})
export class DispenserInformationPageModule {}
