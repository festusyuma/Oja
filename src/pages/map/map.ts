import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  cart_arr=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private broadcaster: Broadcaster,public storage: Storage) {
       
  }

  ionViewDidLoad() {
    this.init();
    console.log('ionViewDidLoad MapPage');
  }



  init(){

    this.storage.get('cart').then((val) => {
    console.log('Cart is', val);
    this.cart_arr=val;     
    });

  }

  mapSuper(){
    // Send event to Native
    this.broadcaster.fireNativeEvent('reqMap', {item:"1"}).then(() => console.log('success'));
  }


  mapGuest(){
  // Send event to Native
  this.broadcaster.fireNativeEvent('reqMap', {item:"2"}).then(() => console.log('success'));
  }



}
