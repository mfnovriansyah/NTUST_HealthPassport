import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import{AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
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
    public navCtrl      : NavController,
    private toastCtrl: ToastController,
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

  async activeBluetooth(){
    this.bluetoothSerial.isEnabled().then(response => {
      this.isEnabled("isOn");
      this.listDevice();
    }, error=>{
      this.isEnabled("isOff");
    })
  } 

  async listDevice(){
    let loading = await this.loadingCtrl.create({
      message    : 'Searching Bluetooth Device',
      spinner:    'crescent',
      cssClass: 'custom-loading',
      duration:   2000
    });

    await loading.present();

    //to inform if No Bluetooth Device Detected
    let errorToast;
    errorToast = await this.toastCtrl.create({
      message: 'No Bluetooth devices were found',
      duration: 2000,
      position: 'top'
    });
    this.bluetoothSerial.list().then(response => {
      this.Devices= response;
      this.loadingCtrl.dismiss();
    }, error=>{
      errorToast.present();
      this.isEnabled("error");
      })
    }

  async connect(address){
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
    }, error=>{
      this.isEnabled("error");
    })
  }

  async deviceConnected(){
    this.bluetoothSerial.subscribe('/n').subscribe(success => {
      this.hundler(success);
      this.setData();
    }, error=>{
      this.isEnabled("error");
    })
  }
  async hundler(value){
    console.log(value);
  }

  async setData(){
    this.bluetoothSerial.write('o').then(response => {
      console.log("okay");
    }, error=>{
      console.log("error");
    })
  }
  async deviceDisconnected(){
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
