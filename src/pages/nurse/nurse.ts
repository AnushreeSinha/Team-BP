import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
/*
  Generated class for the Nurse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nurse',
  templateUrl: 'nurse.html'
})
export class NursePage {
  weight: any;
  height: any;
  bpLow: any;
  bpHigh: any;
  dob: any;
  gender: any;
  systolic: any;
  diastolic: any;


  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NursePage');
    document.getElementById('guideline').style.visibility = "hidden";
    document.getElementById('cards').style.visibility = "hidden";
    this.loadPatientData();
  }

  loadPatientData() {
    var self = this;
    this.http.get('http://localhost:8000/get_user').map(res => res.json()).subscribe(data => {
      console.log(data);
      data.dob = '2005-09-03'
      document.getElementById('name').innerHTML = data.name;
      document.getElementById('dob').innerHTML = data.dob;
      self.dob = data.dob
      document.getElementById('pid').innerHTML = data.pid;
      document.getElementById('gender').innerHTML = data.gender;
      this.gender = data.gender;


    })
  }

  next() {
    if (document.getElementById("card_next").innerHTML == 'Accept' ) {
      console.log("Hellow")
      let body = {
        systolic: this.bpHigh,
        diastolic: this.bpLow,
        pid: document.getElementById('pid').innerHTML,
        height: this.height,
        weight: this.weight
      }
      this.http.post('http://localhost:8000/bpsubmit', JSON.stringify(body)).subscribe(data => {
        console.log(data);
        this.back()
        document.getElementById('guideline').style.visibility = "hidden";
        document.getElementById('cards').style.visibility = "hidden";
      })
    }
    else {
      this.slides.slideNext();
    }
  }

  accept(){
    let body = {
        systolic: this.bpHigh,
        diastolic: this.bpLow,
        pid: document.getElementById('pid').innerHTML,
        height: this.height,
        weight: this.weight
      }
      this.http.post('http://localhost:8000/bpsubmit', JSON.stringify(body)).subscribe(data => {
        console.log(data);
        this.back()
        document.getElementById('guideline').style.visibility = "hidden";
        document.getElementById('cards').style.visibility = "hidden";
      })
  }

  back() {
    this.height = ''
    this.weight = ''
    this.bpHigh = ''
    this.bpLow = ''
  }
  submit() {

    console.log(this.dob)
    var jsondata = { "bpstatus": "Hypertension", "systolic": 96.1, "diastolic": 4.94 }

    this.http.get('http://localhost:8000/bp?height=' + this.height + '&age=' + this.calculateAge(this.dob) + '&gender=' + this.gender + '&diastolic=' + this.bpLow + '&systolic=' + this.bpHigh)
      .map(res => res.json()).subscribe(data => {
        console.log(data)
        jsondata = data
        document.getElementById('guideline').style.visibility = "visible";
        document.getElementById('cards').style.visibility = "visible";
        this.systolic = jsondata.systolic
        this.diastolic = jsondata.diastolic
        if (jsondata.bpstatus == "Hypertension") {
          document.getElementById("card_next").innerHTML = "Next";
          document.getElementById("title").innerHTML = 'Hypertension'
          document.getElementById("title").style.background = "red"
        } else if (jsondata.bpstatus == "Prehypertension") {
          document.getElementById("card_next").innerHTML = "Next";
          document.getElementById("title").innerHTML = 'Prehypertension'
          document.getElementById("title").style.background = "yellow"
        } else {
          document.getElementById("card_next").innerHTML = "Accept";
          document.getElementById("title").innerHTML = 'Normal'
          document.getElementById("title").style.background = "green"
        }
      }
      )
  }

  calculateAge(birthday) { // birthday is a date
    return (2017 - parseInt(birthday) > 15 ? 15 : 2017 - parseInt(birthday));
  }


}
