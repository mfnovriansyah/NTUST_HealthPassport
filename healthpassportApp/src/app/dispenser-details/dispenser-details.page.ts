import { Component, OnInit } from '@angular/core';
import {LoadingController,NavController, ToastController} from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { ActivatedRoute,  Router} from '@angular/router';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-dispenser-details',
  templateUrl: './dispenser-details.page.html',
  styleUrls: ['./dispenser-details.page.scss'],
})
export class DispenserDetailsPage implements OnInit {

private today;
private deviceId= '';
public building= [];
studentNeeds = {
  temperature			: '',
  type			      : ''
}

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
      this.studentNeeds.type 	= this.router.getCurrentNavigation().extras.state.type;
      this.studentNeeds.temperature 	= this.router.getCurrentNavigation().extras.state.temperature;
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
    let errorConnection;
    errorConnection = await this.toastCtrl.create({
      message: 'Error Connection, Cannot find details of dispenser.',
      duration: 2000,
      position: 'top'
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
          this.loadingCtrl.dismiss();
          errorConnection.present();
          this.navCtrl.navigateRoot('/student-needs');
        }
      }
    );    
  }
  async backHome()
  {
    this.navCtrl.navigateRoot('/home');
  }
  async backDispenserDetails()
  {
    let navigationExtras: NavigationExtras = {
			state	: {
        type	: this.studentNeeds.type,
        temperature	: this.studentNeeds.temperature
      }
    };
    this.navCtrl.navigateRoot('/dispenser-information',navigationExtras);
  }
}
