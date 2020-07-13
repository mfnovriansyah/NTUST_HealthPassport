import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {NavController,Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public platform				: Platform,
    private screenOrientation	: ScreenOrientation,
    public navCtrl      : NavController
    
  ) {}

  ngOnInit() {
    if(this.platform.is('cordova'))
		{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    else{
    }
  }
  async loginWithCard()
  {
    this.navCtrl.navigateRoot('/personal-information');
  }
}
