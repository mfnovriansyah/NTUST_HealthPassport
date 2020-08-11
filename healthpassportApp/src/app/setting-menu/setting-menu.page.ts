import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import{AlertController} from '@ionic/angular'
@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.page.html',
  styleUrls: ['./setting-menu.page.scss'],
})
export class SettingMenuPage implements OnInit {


  Devices : any = {};
  constructor(private bluetoothSerial: BluetoothSerial, private alertController: AlertController) { }

  activeBluetooth(){
    this.Devices.id[0] = "test";
    this.Devices.name[0] = "test";
    this.Devices.address[0] = "test";
    this.Devices.id[1] = "test";
    this.Devices.name[1] = "test";
    this.Devices.address[1] = "test";
    this.bluetoothSerial.isEnabled().then(response => {
      this.isEnabled("isOn");
      this.Devices.id[0] = "test";
      this.Devices.name[0] = "test";
      this.Devices.address[0] = "test";
      this.Devices.id[1] = "test";
      this.Devices.address[1] = "test";
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
