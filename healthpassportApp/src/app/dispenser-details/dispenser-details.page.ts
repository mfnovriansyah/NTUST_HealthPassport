import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispenser-details',
  templateUrl: './dispenser-details.page.html',
  styleUrls: ['./dispenser-details.page.scss'],
})
export class DispenserDetailsPage implements OnInit {

private today;
constructor() { }

ngOnInit() {
  this.today = Date.now();
}

}
