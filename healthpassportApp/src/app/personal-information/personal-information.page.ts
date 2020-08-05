import { Component, OnInit } from '@angular/core';
import {LoadingController,NavController, ToastController} from '@ionic/angular';
import { ActivatedRoute,  Router, NavigationExtras} from '@angular/router';


import { ApiService } from '../service/api.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  data : any = []; // for access id
  private deviceid	: '';
  dataForm	: any = {};
  booleanData : boolean ;
  constructor(
    public navCtrl      : NavController,
    public loadingCtrl	: LoadingController,
    public apiSvc				: ApiService,
    public route	      : ActivatedRoute, 
    public router	      : Router ,
    private toastCtrl: ToastController,
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) 
      {
        this.deviceid 	= this.router.getCurrentNavigation().extras.state.deviceid;
      }
    });
  }

  ngOnInit() {
    this.getData();
  }

  //to Logout
  async logout()
  {
    // update status card id after click logout button
    this.dataForm.id = this.data.card_id;
    this.dataForm.login = false;
    this.dataForm.locked = false;
    this.dataForm.device = null;

    this.apiSvc.put('/setlogin/status', this.dataForm).then(
      success => {
        let respon = JSON.parse(this.apiSvc.getDataResult.data);
        console.log(respon);
        if(respon == "Status updated successfully.")
        {
          if(this.deviceid)
          {
            this.navCtrl.navigateRoot(['/home', this.deviceid ]);
          }
          else{
            this.navCtrl.navigateRoot('/home');
          }
        }
        else
        {
          console.log("[logout] failed to update.");
          if(this.deviceid)
          {
            this.navCtrl.navigateRoot(['/home', this.deviceid ]);
          }
          else{
            this.navCtrl.navigateRoot('/home');
          }
        }
      }
    );  
  }
  async deviceLocked()
  {
    // update status card id to make device locked
    this.dataForm.id = this.data.card_id;
    this.dataForm.login = this.data.login;
    this.dataForm.locked = true;
    this.dataForm.device = this.data.device;
    this.apiSvc.put('/setlogin/status', this.dataForm).then(
      success => {
        let respon = JSON.parse(this.apiSvc.getDataResult.data);
        if(respon == "Status updated successfully.")
        {
          console.log("[locked] success");
        }
        else
        {
          console.log("[locked] failed to update.");
        }
        
      }
    );  
  }
  //to GetData with  Device ID
  async getData()
  	{
        let loading = await this.loadingCtrl.create({
            message    : 'Checking Card ID <br> Please Put Your Card ID',
            spinner:    'crescent',
            cssClass: 'custom-loading',
            duration:   5000
        });
        await loading.present();

        //to inform if No Card ID Detected
        let toast;
        toast = await this.toastCtrl.create({
          message: 'No Card ID Detected or Invalid ID Card, Please Try Again',
          duration: 2000,
          position: 'top'
        });
        
  		  this.apiSvc.get('/check/device='+this.deviceid).then(
  			success => {
          let respon = JSON.parse(this.apiSvc.getDataResult.data);
          console.log(respon);
          //set timeout and interval for check card id by device id
          let checkData = setInterval(() => this.checkData(), 1000);
          setTimeout(() => { clearInterval(checkData); 
            if(this.booleanData == false){
              let navigationExtras: NavigationExtras = {
                state	: {
                  deviceid	: this.deviceid
                }
              };
              console.log(navigationExtras);
              
              if(this.deviceid)
              {
                toast.present();
                this.navCtrl.navigateRoot('/login', navigationExtras);
                
              }
              else{
                this.navCtrl.navigateRoot('/login');
              }
            }
          }, 5000);
        }
  		);
    }

  //to check Card ID by Device ID 
  async checkData(){
    this.apiSvc.get('/check/device='+this.deviceid).then(
      success => {
        let respon = JSON.parse(this.apiSvc.getDataResult.data);
          if(!respon.Data[0])
          {
            this.booleanData = false;
          }
          else if(respon.Data[0].login ==true && respon.Data[0].locked == false)
          {
            this.booleanData = true;
            this.loadingCtrl.dismiss();
            this.data = respon.Data[0];
            //put method to update to database locked
            this.deviceLocked();
          }   
      }
    );    
  }
}

