import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NursePage} from '../nurse/nurse'
import { DoctorPage} from '../doctor/doctor'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  nursePage(){
      this.navCtrl.push(NursePage)
  }

  doctorPage(){
      this.navCtrl.push(DoctorPage)
  }

}
