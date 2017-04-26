import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Chart } from 'chart.js';

/*
  Generated class for the Doctor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html'
})

export class DoctorPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('barCanvas') barCanvas;
 
  barChart: any;
  jsonData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorPage');
    this.jsonData = [{"date": "1997-04-30", "systolic": 87, "diastolic": 75}, 
                       {"date": "1997-05-01", "systolic": 107, "diastolic": 67}, 
                       {"date": "1997-05-07", "systolic": 68, "diastolic": 43}, 
                       {"date": "1999-12-20", "systolic": 83, "diastolic": 53}, 
                       {"date": "1999-12-21", "systolic": 128, "diastolic": 81}, 
                       {"date": "2001-01-19", "systolic": 110, "diastolic": 69}, 
                       {"date": "2001-01-24", "systolic": 100, "diastolic": 63}, 
                       {"date": "2001-01-25", "systolic": 129, "diastolic": 80}, 
                       {"date": "2001-10-31", "systolic": 133, "diastolic": 82}, 
                       {"date": "2001-11-01", "systolic": 138, "diastolic": 85}, 
                       {"date": "2001-11-02", "systolic": 85, "diastolic": 54}, 
                       {"date": "2001-11-05", "systolic": 133, "diastolic": 82}, 
                       {"date": "2005-02-09", "systolic": 109, "diastolic": 66}, 
                       {"date": "2005-02-10", "systolic": 97, "diastolic": 58}, 
                       {"date": "2005-02-23", "systolic": 60, "diastolic": 35}, 
                       {"date": "2005-02-24", "systolic": 128, "diastolic": 78}, 
                       {"date": "2005-02-25", "systolic": 109, "diastolic": 66}, 
                       {"date": "2009-04-07", "systolic": 48, "diastolic": 29}, 
                       {"date": "2009-04-08", "systolic": 120, "diastolic": 72}, 
                       {"date": "2009-04-14", "systolic": 125, "diastolic": 75}, 
                       {"date": "2009-04-23", "systolic": 63, "diastolic": 38}, 
                       {"date": "2009-04-24", "systolic": 105, "diastolic": 63}, 
                       {"date": "2009-04-27", "systolic": 71, "diastolic": 43}, 
                       {"date": "2009-04-28", "systolic": 132, "diastolic": 79}, 
                       {"date": "2009-10-29", "systolic": 120, "diastolic": 72}, 
                       {"date": "2009-10-30", "systolic": 40, "diastolic": 25}, 
                       {"date": "2009-12-01", "systolic": 100, "diastolic": 60}];

    var label_arr = [];
    var systolic_arr = [];
    var diastolic_arr = [];
    var color_arr = [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ];
    var systolic_color = [];
    var white_color = [];

    for (var i = 0; i < this.jsonData.length; i++) { 
        label_arr.push(this.jsonData[i]["date"]);
        systolic_arr.push(this.jsonData[i]["systolic"]-this.jsonData[i]["diastolic"]);
        diastolic_arr.push(this.jsonData[i]["diastolic"]);
        systolic_color.push(color_arr[i%color_arr.length]);
        white_color.push('rgba(255, 255, 255, 1)');
    }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: label_arr,
                datasets: [{
                    data: diastolic_arr,
                    backgroundColor: white_color,
                    borderColor: white_color,
                    borderWidth: 1
                },
                {
                    data: systolic_arr,
                    backgroundColor: systolic_color,
                    borderColor: white_color,
                    borderWidth: 0
                }]
            },
            options: {
                legend: {display: false},
                tooltips: {enabled:false},
                scales: {
                    yAxes: [{
                        gridLines:{
                            display:false
                        },
                        ticks: {
                            beginAtZero:false
                        },
                        stacked:true
                    }],
                    xAxes: [{
                        gridLines:{
                            display:false
                        }
                    }]
                }
            }
 
        });
  }

next(){
 this.slides.slideNext();
} 

back(){
  this.slides.slidePrev();
}

}
