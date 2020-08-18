import { Component, OnInit } from '@angular/core';
import {NavController,ToastController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-student-needs',
  templateUrl: './student-needs.page.html',
  styleUrls: ['./student-needs.page.scss'],
})
export class StudentNeedsPage implements OnInit {
  studentNeeds = {
      temperature			: '',
      type			      : ''
  }
  type      = ['Hot Water', 'Cold Water'];
  
  constructor(
    public navCtrl      : NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }
  async searchDipsenser()
  {

    // to inform fill type of water field
    let fileType;
    fileType = await this.toastCtrl.create({
      message: 'Fill Type of Water',
      duration: 2000,
      position: 'top'
    });
    // to inform fill tempereature field
    let fillTemp;
    fillTemp = await this.toastCtrl.create({
      message: 'Fill Temperature',
      duration: 2000,
      position: 'top'
    });
    if(this.studentNeeds.type == '' || this.studentNeeds.type == undefined)
    {
        fileType.present();
        return false;
    }
    
    if(this.studentNeeds.temperature == '' || this.studentNeeds.temperature == undefined)
    {
        fillTemp.present();
        return false;
    }

    let navigationExtras: NavigationExtras = {
			state	: {
        type	: this.studentNeeds.type,
        temperature	: this.studentNeeds.temperature
      }
    };
    this.navCtrl.navigateRoot('/dispenser-information',navigationExtras);
  }


}
