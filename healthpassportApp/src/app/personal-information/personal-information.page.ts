import { Component, OnInit } from '@angular/core';
import {NavController } from '@ionic/angular';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {

  constructor(
    public navCtrl      : NavController
  ) { }

  ngOnInit() {
  }
  async home()
  {
    this.navCtrl.navigateRoot('/home');
  }
}
