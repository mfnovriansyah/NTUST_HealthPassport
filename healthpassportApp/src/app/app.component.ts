import { Component } from '@angular/core';

import { Platform,NavController,LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {NavigationExtras } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public storage         : Storage,
    public navCtrl         : NavController,
    public loadingCtrl     : LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.checkDeviceId();
    
    
  }
  //check Device ID in Storage
  async checkDeviceId(){
    let loading = await this.loadingCtrl.create({
        message    : 'Checking DeviceID',
    });
    await loading.present();
    this.storage.get('settingData').then((val) => {
      if(this.platform.is('cordova'))
      {
          this.statusBar.backgroundColorByHexString('#3171e0');
          this.splashScreen.hide();                
      } 
      loading.dismiss(); 
      
      if(val != '' && val != null)
      {
        let data = JSON.parse(val);
        console.log(data.deviceId);
        let navigationExtras: NavigationExtras = {
          state	: {
            deviceid	: data.deviceId
          }
        };
        this.navCtrl.navigateRoot('/home',navigationExtras);
      }         
    });
  }
}
