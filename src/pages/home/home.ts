import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GESTURE_PRIORITY_TOGGLE } from 'ionic-angular/umd/gestures/gesture-controller';


declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

@ViewChild('map') mapRef:ElementRef;
// map:any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    console.log(this.mapRef);
    this.showMap();
  }


  showMap(){
    var location=new google.maps.LatLng(51.507351,-0.127758);
    const options={
      center:location,
      zoom:20
    }
    
    var map=new google.maps.Map(this.mapRef.nativeElement,options);
  
    this.addMarker(location,map);
  }


   addMarker(location,map){
     return new google.maps.Marker({location,map});
   }



}
