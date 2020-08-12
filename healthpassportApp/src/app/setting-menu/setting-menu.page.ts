import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import{AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController } from '@ionic/angular';
import {NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.page.html',
  styleUrls: ['./setting-menu.page.scss'],
})
export class SettingMenuPage implements OnInit {

  //variable to save deviceId from Form
  dataForm = {
    deviceId         : ''
  }

  Devices;
  constructor(
    private bluetoothSerial: BluetoothSerial, 
    private alertController: AlertController,
    public loadingCtrl  : LoadingController,
    public storage      : Storage,
    public navCtrl      : NavController
    ) { }

  //Set Device Id and Save it to Storage
  async setDeviceId()
  {
    let loading = await this.loadingCtrl.create({
      message    : 'Set Device',
    });
    console.log(this.dataForm);
    await loading.present();
    if(this.dataForm.deviceId != null)
    {
      let navigationExtras: NavigationExtras = {
        state	: {
          deviceid	: this.dataForm.deviceId
        }
      };
      this.storage.set('settingData', JSON.stringify(this.dataForm)).then(() => {
        loading.dismiss();
        console.log(this.dataForm);
        this.navCtrl.navigateRoot('/home',navigationExtras);
      });
    }
  }

  activeBluetooth(){
    this.bluetoothSerial.isEnabled().then(response => {
      this.isEnabled("isOn");
      this.listDevice();
    }, error=>{
      this.isEnabled("isOff");
    })
  } 

  listDevice(){
    this.bluetoothSerial.list().then(response => {
      this.Devices= response;
    }, error=>{
      this.isEnabled("error");
    })
  }

  connect(address){
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
    }, error=>{
      this.isEnabled("error");
    })
  }

  deviceConnected(){
    this.bluetoothSerial.subscribe('/n').subscribe(success => {
      this.hundler(success);
    }, error=>{
      this.isEnabled("error");
    })
  }
  hundler(value){
    console.log(value);
  }

  setData(){
    this.bluetoothSerial.write("O").then(response => {
      console.log("okay");
    }, error=>{
      console.log("error");
    })
  }
  deviceDisconnected(){
    this.bluetoothSerial.disconnect();
    console.log("Device Disconected");
  }


  async isEnabled(msg){
    const alert= this.alertController.create({
      header:'Alerts',
      message: msg,
      buttons: [{
        text: 'Okay',
        handler:() =>{
          console.log("Okay");
        }
      }]
    })
  }

  ngOnInit() {
  }

}
