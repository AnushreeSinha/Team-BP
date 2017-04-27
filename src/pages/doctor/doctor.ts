import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
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
    bmiData: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) { }





    ionViewDidLoad() {
        console.log('ionViewDidLoad DoctorPage');
        this.loadUserData()
    }

    loadUserData() {
        var self = this;
        this.http.get('http://localhost:8000/get_observations').map(res => res.json()).subscribe(data => {
            console.log(data);
            data.dob = '2005-09-03'
            document.getElementById('name').innerHTML = data.name;
            document.getElementById('ageData').innerHTML = this.calculateAge(data.dob).toString();
            document.getElementById('pid').innerHTML = data.pid;
            document.getElementById('gender').innerHTML = data.gender;
            document.getElementById('heightData').innerHTML = data.height;
            document.getElementById('bpLow').innerHTML = data.diastolic;
            document.getElementById('bpHigh').innerHTML = data.systolic;
            this.drawChart(data)

        })
    }
    drawChart(data) {
        this.jsonData = data.bp
        this.bmiData = data.bmi
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
        var bmi_arr = [];

        for (var i = 0; i < this.jsonData.length; i++) {
            label_arr.push(this.jsonData[i]["date"]);
            systolic_arr.push(this.jsonData[i]["systolic"] - this.jsonData[i]["diastolic"]);
            diastolic_arr.push(this.jsonData[i]["diastolic"]);
            systolic_color.push(color_arr[i % color_arr.length]);
            white_color.push('rgba(255, 255, 255, 1)');
            bmi_arr.push(this.bmiData[i]["bmi"]);
        }

        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: label_arr,
                datasets: [
                    {
                        type: 'line',
                        data: bmi_arr,
                        fill: false,
                        pointBackgroundColor: 'rgba(214, 119, 104, 1)',
                        borderColor: 'rgba(214, 119, 104, 0.3)',
                        borderWidth: 1
                    },
                    {
                        data: diastolic_arr,
                        backgroundColor: white_color,
                        borderColor: white_color,
                        borderWidth: 0,
                    },
                    {
                        data: systolic_arr,
                        backgroundColor: systolic_color,
                        borderColor: white_color,
                        borderWidth: 0,
                    }
                ]
            },
            options: {
                legend: { display: false },
                tooltips: { enabled: false },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: false
                        },
                        stacked: true
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }

        });

    }

    calculateAge(birthday) { // birthday is a date
        return (2017 - parseInt(birthday) > 15 ? 15 : 2017 - parseInt(birthday));
    }

}

