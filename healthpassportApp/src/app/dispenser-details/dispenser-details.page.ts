import { Component, OnInit } from '@angular/core';
import {LoadingController,NavController, ToastController} from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { ActivatedRoute,  Router} from '@angular/router';
@Component({
  selector: 'app-dispenser-details',
  templateUrl: './dispenser-details.page.html',
  styleUrls: ['./dispenser-details.page.scss'],
})
export class DispenserDetailsPage implements OnInit {

private today;
private deviceId= '';
private building= [];

data : any = []; // for Dispenser Details Data
constructor(
  public navCtrl      : NavController,
  public loadingCtrl	: LoadingController,
  public apiSvc				: ApiService,
  private toastCtrl: ToastController,
  public route	      : ActivatedRoute, 
  public router	      : Router

) { }

ngOnInit() {
  this.today = Date.now();
  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) 
    {
      this.deviceId 	= this.router.getCurrentNavigation().extras.state.deviceId;
    }
  });
  this.getDispenserDetails();
  console.log(this.deviceId);
}
 async getDispenserDetails()
  {
    let loading = await this.loadingCtrl.create({
        message    : 'Load Dispenser Data',
    });
    await loading.present();        
    this.apiSvc.getDispenser('?Device_ID='+this.deviceId).then(
      success => {
        let respon = JSON.parse(this.apiSvc.getDataResult.data);
        console.log(respon.msg);
        if(respon.msg == 'success'){
          this.loadingCtrl.dismiss();
          this.data= respon;
          if(this.data.Device_ID)
          {
            this.building = this.data.Device_ID.split("_");
            this.building = this.building[0];
            console.log(this.building);
          }
          console.log(this.data);
        }
        else{
          console.log("error can't find details of dispenser.");
        }
      }
    );    
  }
}
